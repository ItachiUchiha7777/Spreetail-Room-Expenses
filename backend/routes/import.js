const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const authenticateToken = require('../middleware/auth');
const { detectAnomalies } = require('../utils/anomalyDetector');
const { Prisma } = require('@prisma/client');

// Helper CSV Parser
function parseCSV(text) {
  const linesRaw = text.split(/\r?\n/);
  if (linesRaw.length === 0 || !linesRaw[0].trim()) return [];
  
  const splitCSVLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result.map(v => {
      let val = v.trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      return val;
    });
  };
  
  const headers = splitCSVLine(linesRaw[0]).map(h => h.trim().toLowerCase().replace(/[\s"]/g, '_'));
  const rows = [];
  
  for (let i = 1; i < linesRaw.length; i++) {
    const line = linesRaw[i];
    if (!line.trim()) continue;
    const values = splitCSVLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] !== undefined ? values[index] : '';
    });
    rows.push(row);
  }
  return rows;
}

// Upload CSV & Detect Anomalies
router.post('/upload', authenticateToken, async (req, res) => {
  const { csvContent, filename, groupId } = req.body;

  if (!csvContent || !groupId) {
    return res.status(400).json({ error: 'CSV content and Group ID are required' });
  }

  try {
    const groupIntId = parseInt(groupId);
    // Fetch group details including members
    const group = await prisma.group.findUnique({
      where: { id: groupIntId },
      include: {
        memberships: {
          include: {
            user: { select: { id: true, name: true } }
          }
        }
      }
    });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const membersList = group.memberships.map(m => ({
      id: m.userId,
      name: m.user.name,
      joinedAt: m.joinedAt,
      leftAt: m.leftAt
    }));

    // Parse CSV
    const parsedRows = parseCSV(csvContent);
    if (parsedRows.length === 0) {
      return res.status(400).json({ error: 'CSV is empty or header format is incorrect' });
    }

    // Detect anomalies
    const analysis = detectAnomalies(parsedRows, membersList);

    // Save Import Batch as staged data
    const batch = await prisma.importBatch.create({
      data: {
        filename: filename || 'expenses_export.csv',
        importedBy: req.user.id,
        status: 'pending_review',
        rawData: { rows: analysis.processedRows } // Store full analysis rows
      }
    });

    // Save Anomalies
    const anomalyData = analysis.anomalies.map(an => ({
      importBatchId: batch.id,
      rowReference: an.desc.includes('Row ') ? parseInt(an.desc.match(/Row (\d+)/)[1]) : 0,
      anomalyType: an.type,
      description: an.desc,
      rawData: {}, // Can leave empty or store custom metadata
      requiresApproval: an.requiresApproval,
      resolutionStatus: an.requiresApproval ? 'pending_approval' : 'auto_handled'
    }));

    if (anomalyData.length > 0) {
      await prisma.importAnomaly.createMany({
        data: anomalyData
      });
    }

    // Refetch batch with anomalies
    const finalBatch = await prisma.importBatch.findUnique({
      where: { id: batch.id },
      include: {
        anomalies: true
      }
    });

    res.json({
      batch: finalBatch,
      processedRows: analysis.processedRows
    });

  } catch (error) {
    console.error('CSV upload/analysis failed:', error);
    res.status(500).json({ error: 'Failed to process and analyze CSV' });
  }
});

// Commit Staged CSV after user review/approval
router.post('/commit/:batchId', authenticateToken, async (req, res) => {
  const batchId = parseInt(req.params.batchId);
  const { usdRate, resolvedRows, groupId } = req.body;

  if (isNaN(batchId) || !resolvedRows || !groupId) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const usdRateNum = parseFloat(usdRate || '83.0');

  try {
    const batch = await prisma.importBatch.findUnique({
      where: { id: batchId },
      include: { anomalies: true }
    });

    if (!batch) {
      return res.status(404).json({ error: 'Import batch not found' });
    }

    if (batch.status === 'completed') {
      return res.status(400).json({ error: 'This import batch has already been committed' });
    }

    const groupIntId = parseInt(groupId);
    const group = await prisma.group.findUnique({
      where: { id: groupIntId },
      include: { memberships: { include: { user: true } } }
    });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // 1. Collect all unique names from resolvedRows to verify user seed/membership
    const uniqueNames = new Set();
    resolvedRows.forEach(row => {
      if (row.resolvedPayer) uniqueNames.add(row.resolvedPayer);
      if (row.resolvedSplitWith) {
        row.resolvedSplitWith.forEach(name => uniqueNames.add(name));
      }
    });

    // Commit everything in a database transaction
    await prisma.$transaction(async (tx) => {
      
      // Auto-seed missing users and setup canonical memberships
      // (This builds the timeline from 4.1 seamlessly during the first import!)
      const dbUsers = await tx.user.findMany();
      const dbUserMap = new Map(dbUsers.map(u => [u.name.toLowerCase(), u]));

      // Standard timeline configuration
      const timelineInfo = {
        'aisha': { joined: '2026-02-01', left: null },
        'rohan': { joined: '2026-02-01', left: null },
        'priya': { joined: '2026-02-01', left: null },
        'meera': { joined: '2026-02-01', left: '2026-03-31' },
        'sam': { joined: '2026-04-08', left: null },
        'dev': [
          { joined: '2026-02-08', left: '2026-02-08' },
          { joined: '2026-03-08', left: '2026-03-14' }
        ],
        'kabir': { joined: '2026-03-11', left: '2026-03-11' }
      };

      for (const rawName of uniqueNames) {
        const nameLower = rawName.toLowerCase();
        let userObj = dbUserMap.get(nameLower);

        // Create user if not exists
        if (!userObj) {
          userObj = await tx.user.create({
            data: {
              name: rawName,
              email: `${nameLower}@example.com`,
              passwordHash: '$2a$10$WkG.1QOcrf63i7d54r2d8.vVn7F4uBSpc2k8pGvHlJbBqEshqM65S' // bcrypt hash of "Password123"
            }
          });
          dbUserMap.set(nameLower, userObj);
        }

        // Setup memberships based on standard timeline (or fallback if guest)
        const membershipsExist = await tx.groupMembership.findMany({
          where: { groupId: groupIntId, userId: userObj.id }
        });

        if (membershipsExist.length === 0) {
          const tInfo = timelineInfo[nameLower];
          if (tInfo) {
            if (Array.isArray(tInfo)) {
              // Dev has multiple memberships (Option A)
              for (const stint of tInfo) {
                await tx.groupMembership.create({
                  data: {
                    groupId: groupIntId,
                    userId: userObj.id,
                    joinedAt: new Date(stint.joined),
                    leftAt: stint.left ? new Date(stint.left) : null
                  }
                });
              }
            } else {
              await tx.groupMembership.create({
                data: {
                  groupId: groupIntId,
                  userId: userObj.id,
                  joinedAt: new Date(tInfo.joined),
                  leftAt: tInfo.left ? new Date(tInfo.left) : null
                }
              });
            }
          } else {
            // General fallback: joined on first expense date, active
            const userExpenses = resolvedRows.filter(r => r.resolvedPayer === rawName || (r.resolvedSplitWith && r.resolvedSplitWith.includes(rawName)));
            const firstDate = userExpenses.length > 0 ? new Date(userExpenses[0].resolvedDate) : new Date('2026-02-01');
            await tx.groupMembership.create({
              data: {
                groupId: groupIntId,
                userId: userObj.id,
                joinedAt: firstDate,
                leftAt: null
              }
            });
          }
        }
      }

      // Re-query user map to get updated user IDs
      const finalUsers = await tx.user.findMany();
      const userIdMap = new Map(finalUsers.map(u => [u.name.toLowerCase(), u.id]));

      // 2. Insert Expenses & Splits & Settlements
      for (const row of resolvedRows) {
        // Skip rows that were duplicate rejects (e.g. Row 6 or Row 25 if rejected)
        if (row.rejected) continue;

        const payerId = userIdMap.get(row.resolvedPayer.toLowerCase());
        if (!payerId) continue; // Skip if invalid

        const currency = row.resolvedCurrency;
        const rate = currency !== 'INR' ? usdRateNum : 1.0;
        const amount = parseFloat(row.parsedAmount);
        const amountInInr = parseFloat((amount * rate).toFixed(2));
        const expenseDate = new Date(row.resolvedDate);

        if (row.isSettlement) {
          // Reclassified settlement (Rohan paid Aisha back / Sam deposit)
          // splitWith lists target
          const paidToName = row.resolvedSplitWith[0];
          const paidToId = userIdMap.get(paidToName.toLowerCase());
          if (!paidToId) continue;

          await tx.settlement.create({
            data: {
              groupId: groupIntId,
              paidBy: payerId,
              paidTo: paidToId,
              amount: new Prisma.Decimal(amountInInr),
              currency,
              settledDate: expenseDate,
              note: row.noteRaw || row.description || 'Imported Settlement'
            }
          });
        } else {
          // Regular expense
          const expense = await tx.expense.create({
            data: {
              groupId: groupIntId,
              paidBy: payerId,
              description: row.description,
              amount: new Prisma.Decimal(amount),
              currency,
              exchangeRateToInr: currency !== 'INR' ? new Prisma.Decimal(rate) : null,
              amountInInr: new Prisma.Decimal(amountInInr),
              splitType: row.resolvedSplitType,
              expenseDate,
              isSettlement: false,
              source: 'import',
              importBatchId: batchId
            }
          });

          // Compute splits
          const splits = row.resolvedSplitWith.map(name => ({
            userId: userIdMap.get(name.toLowerCase()),
            name
          }));

          const resolvedSplits = [];
          
          if (row.resolvedSplitType === 'equal') {
            const splitCount = splits.length;
            const inrShare = amountInInr / splitCount;
            const rawShare = amount / splitCount;

            let sumInr = 0;
            let sumRaw = 0;

            splits.forEach((split, index) => {
              let currentRawShare = parseFloat(rawShare.toFixed(2));
              let currentInrShare = parseFloat(inrShare.toFixed(2));

              if (index === splitCount - 1) {
                currentRawShare = parseFloat((amount - sumRaw).toFixed(2));
                currentInrShare = parseFloat((amountInInr - sumInr).toFixed(2));
              }

              sumRaw += currentRawShare;
              sumInr += currentInrShare;

              resolvedSplits.push({
                expenseId: expense.id,
                userId: split.userId,
                shareAmount: new Prisma.Decimal(currentInrShare),
                shareValue: new Prisma.Decimal(currentRawShare)
              });
            });

          } else if (row.resolvedSplitType === 'percentage') {
            // Percentages could sum to 110% in CSV (pizza/brunch rows).
            // We apply normalization policy: divide each by sum of %
            const detailParts = row.splitDetailsRaw.split(';').map(p => p.trim()).filter(Boolean);
            const percentages = {};
            let sumPct = 0;

            detailParts.forEach(part => {
              const match = part.match(/(.+)\s+(\d+)\s*%/);
              if (match) {
                const name = match[1].trim();
                const pct = parseInt(match[2]);
                const normalizedUser = finalUsers.find(u => u.name.toLowerCase() === name.toLowerCase());
                if (normalizedUser) {
                  percentages[normalizedUser.id] = pct;
                  sumPct += pct;
                }
              }
            });

            // Normalize splits
            const splitUserIds = Object.keys(percentages).map(Number);
            let sumInr = 0;
            let sumRaw = 0;

            splitUserIds.forEach((uid, index) => {
              const originalPct = percentages[uid];
              const normalizedPct = originalPct / (sumPct || 100); // Normalize to 1.0

              let currentRawShare = parseFloat((amount * normalizedPct).toFixed(2));
              let currentInrShare = parseFloat((amountInInr * normalizedPct).toFixed(2));

              if (index === splitUserIds.length - 1) {
                currentRawShare = parseFloat((amount - sumRaw).toFixed(2));
                currentInrShare = parseFloat((amountInInr - sumInr).toFixed(2));
              }

              sumRaw += currentRawShare;
              sumInr += currentInrShare;

              resolvedSplits.push({
                expenseId: expense.id,
                userId: uid,
                shareAmount: new Prisma.Decimal(currentInrShare),
                shareValue: new Prisma.Decimal(originalPct) // Keep original stated percentage for auditing
              });
            });

          } else if (row.resolvedSplitType === 'share') {
            // Share counts (e.g. Aisha 1; Rohan 2; Priya 1; Dev 2)
            const detailParts = row.splitDetailsRaw.split(';').map(p => p.trim()).filter(Boolean);
            const shares = {};
            let totalShares = 0;

            detailParts.forEach(part => {
              // Matches name followed by integer
              const match = part.match(/(.+)\s+(\d+)/);
              if (match) {
                const name = match[1].trim();
                const shareCount = parseInt(match[2]);
                const normalizedUser = finalUsers.find(u => u.name.toLowerCase() === name.toLowerCase());
                if (normalizedUser) {
                  shares[normalizedUser.id] = shareCount;
                  totalShares += shareCount;
                }
              }
            });

            const splitUserIds = Object.keys(shares).map(Number);
            let sumInr = 0;
            let sumRaw = 0;

            splitUserIds.forEach((uid, index) => {
              const userShares = shares[uid];
              const ratio = userShares / (totalShares || 1);

              let currentRawShare = parseFloat((amount * ratio).toFixed(2));
              let currentInrShare = parseFloat((amountInInr * ratio).toFixed(2));

              if (index === splitUserIds.length - 1) {
                currentRawShare = parseFloat((amount - sumRaw).toFixed(2));
                currentInrShare = parseFloat((amountInInr - sumInr).toFixed(2));
              }

              sumRaw += currentRawShare;
              sumInr += currentInrShare;

              resolvedSplits.push({
                expenseId: expense.id,
                userId: uid,
                shareAmount: new Prisma.Decimal(currentInrShare),
                shareValue: new Prisma.Decimal(userShares)
              });
            });

          } else if (row.resolvedSplitType === 'exact') {
            // e.g. "Rohan 700; Priya 400; Meera 400"
            const detailParts = row.splitDetailsRaw.split(';').map(p => p.trim()).filter(Boolean);
            const exactValues = {};
            
            detailParts.forEach(part => {
              const match = part.match(/(.+)\s+(\d+)/);
              if (match) {
                const name = match[1].trim();
                const val = parseFloat(match[2]);
                const normalizedUser = finalUsers.find(u => u.name.toLowerCase() === name.toLowerCase());
                if (normalizedUser) {
                  exactValues[normalizedUser.id] = val;
                }
              }
            });

            const splitUserIds = Object.keys(exactValues).map(Number);
            let sumInr = 0;

            splitUserIds.forEach((uid, index) => {
              const rawShareVal = exactValues[uid];
              let currentInrShare = parseFloat((rawShareVal * rate).toFixed(2));

              if (index === splitUserIds.length - 1) {
                currentInrShare = parseFloat((amountInInr - sumInr).toFixed(2));
              }

              sumInr += currentInrShare;

              resolvedSplits.push({
                expenseId: expense.id,
                userId: uid,
                shareAmount: new Prisma.Decimal(currentInrShare),
                shareValue: new Prisma.Decimal(rawShareVal)
              });
            });
          }

          if (resolvedSplits.length > 0) {
            await tx.expenseSplit.createMany({
              data: resolvedSplits
            });
          }
        }
      }

      // Update Import batch status
      await tx.importBatch.update({
        where: { id: batchId },
        data: {
          status: 'completed'
        }
      });

      // Update anomalies status
      await tx.importAnomaly.updateMany({
        where: { importBatchId: batchId },
        data: {
          resolutionStatus: 'approved',
          approvedAt: new Date()
        }
      });
    });

    res.json({ message: 'CSV import successfully committed to database.' });

  } catch (error) {
    console.error('Failed to commit CSV import:', error);
    res.status(500).json({ error: 'Database transaction failed during commit.' });
  }
});

module.exports = router;
