const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const authenticateToken = require('../middleware/auth');
const { Prisma } = require('@prisma/client');

// Create Manual Expense
router.post('/', authenticateToken, async (req, res) => {
  const {
    groupId,
    paidBy,
    description,
    amount,
    currency,
    exchangeRateToInr,
    splitType,
    expenseDate,
    splits // Array of { userId, shareValue }
  } = req.body;

  // Basic validation
  if (!groupId || !paidBy || !description || amount === undefined || !splitType || !expenseDate || !splits || !splits.length) {
    return res.status(400).json({ error: 'Missing required expense fields' });
  }

  const numericAmount = parseFloat(amount);
  const parsedDate = new Date(expenseDate);
  const rate = currency !== 'INR' ? parseFloat(exchangeRateToInr) : 1.0;

  if (isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  if (currency !== 'INR' && (isNaN(rate) || rate <= 0)) {
    return res.status(400).json({ error: 'A valid exchange rate is required for foreign currencies' });
  }

  try {
    // Check if group exists
    const group = await prisma.group.findUnique({
      where: { id: parseInt(groupId) },
      include: {
        memberships: true
      }
    });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Helper to normalize date to midnight local
    const toMidnight = (d) => {
      const nd = new Date(d);
      nd.setHours(0, 0, 0, 0);
      return nd;
    };

    // Helper to check if a user is active on a date
    const checkActiveMembership = (userId, date) => {
      const targetDate = toMidnight(date);
      return group.memberships.some(m => {
        if (m.userId !== userId) return false;
        const joined = toMidnight(m.joinedAt);
        const left = m.leftAt ? toMidnight(m.leftAt) : null;
        return joined <= targetDate && (!left || targetDate <= left);
      });
    };

    // 1. Verify payer is active on expenseDate
    if (!checkActiveMembership(parseInt(paidBy), parsedDate)) {
      return res.status(400).json({ error: `Payer is not an active group member on the selected date: ${expenseDate}` });
    }

    // 2. Verify all split participants are active on expenseDate
    for (const split of splits) {
      if (!checkActiveMembership(parseInt(split.userId), parsedDate)) {
        const u = await prisma.user.findUnique({ where: { id: parseInt(split.userId) } });
        return res.status(400).json({
          error: `Participant ${u ? u.name : split.userId} is not an active group member on the selected date: ${expenseDate}`
        });
      }
    }

    // 3. Resolve splits and validate math
    const resolvedSplits = [];
    const amountInInr = parseFloat((numericAmount * rate).toFixed(2));

    if (splitType === 'equal') {
      const splitCount = splits.length;
      const rawShare = numericAmount / splitCount;
      const inrShare = amountInInr / splitCount;

      let sumInr = 0;
      let sumRaw = 0;

      splits.forEach((split, index) => {
        let currentRawShare = parseFloat(rawShare.toFixed(2));
        let currentInrShare = parseFloat(inrShare.toFixed(2));

        // Adjust for rounding errors on the last item
        if (index === splitCount - 1) {
          currentRawShare = parseFloat((numericAmount - sumRaw).toFixed(2));
          currentInrShare = parseFloat((amountInInr - sumInr).toFixed(2));
        }

        sumRaw += currentRawShare;
        sumInr += currentInrShare;

        resolvedSplits.push({
          userId: parseInt(split.userId),
          shareValue: currentRawShare,
          shareAmount: currentInrShare
        });
      });

    } else if (splitType === 'percentage') {
      let totalPct = 0;
      splits.forEach(s => totalPct += parseFloat(s.shareValue));
      
      // Strict validation for manual UI entries (must sum to 100%)
      if (Math.abs(totalPct - 100) > 0.01) {
        return res.status(400).json({ error: `Percentages must sum to 100% (found ${totalPct}%)` });
      }

      let sumInr = 0;
      let sumRaw = 0;

      splits.forEach((split, index) => {
        const pct = parseFloat(split.shareValue) / 100;
        let currentRawShare = parseFloat((numericAmount * pct).toFixed(2));
        let currentInrShare = parseFloat((amountInInr * pct).toFixed(2));

        if (index === splits.length - 1) {
          currentRawShare = parseFloat((numericAmount - sumRaw).toFixed(2));
          currentInrShare = parseFloat((amountInInr - sumInr).toFixed(2));
        }

        sumRaw += currentRawShare;
        sumInr += currentInrShare;

        resolvedSplits.push({
          userId: parseInt(split.userId),
          shareValue: parseFloat(split.shareValue), // Store original percent value
          shareAmount: currentInrShare
        });
      });

    } else if (splitType === 'share') {
      let totalShares = 0;
      splits.forEach(s => totalShares += parseFloat(s.shareValue));

      if (totalShares <= 0) {
        return res.status(400).json({ error: 'Total shares must be greater than zero' });
      }

      let sumInr = 0;
      let sumRaw = 0;

      splits.forEach((split, index) => {
        const shareCount = parseFloat(split.shareValue);
        const ratio = shareCount / totalShares;
        let currentRawShare = parseFloat((numericAmount * ratio).toFixed(2));
        let currentInrShare = parseFloat((amountInInr * ratio).toFixed(2));

        if (index === splits.length - 1) {
          currentRawShare = parseFloat((numericAmount - sumRaw).toFixed(2));
          currentInrShare = parseFloat((amountInInr - sumInr).toFixed(2));
        }

        sumRaw += currentRawShare;
        sumInr += currentInrShare;

        resolvedSplits.push({
          userId: parseInt(split.userId),
          shareValue: shareCount,
          shareAmount: currentInrShare
        });
      });

    } else if (splitType === 'exact') {
      let sumRaw = 0;
      splits.forEach(s => sumRaw += parseFloat(s.shareValue));

      if (Math.abs(sumRaw - numericAmount) > 0.02) {
        return res.status(400).json({ error: `Exact split amounts (${sumRaw}) must equal total expense amount (${numericAmount})` });
      }

      let sumInr = 0;

      splits.forEach((split, index) => {
        const val = parseFloat(split.shareValue);
        let currentInrShare = parseFloat((val * rate).toFixed(2));

        if (index === splits.length - 1) {
          currentInrShare = parseFloat((amountInInr - sumInr).toFixed(2));
        }

        sumInr += currentInrShare;

        resolvedSplits.push({
          userId: parseInt(split.userId),
          shareValue: val,
          shareAmount: currentInrShare
        });
      });
    } else {
      return res.status(400).json({ error: `Unsupported split type: ${splitType}` });
    }

    // Write to database in a transaction
    const savedExpense = await prisma.$transaction(async (tx) => {
      const expense = await tx.expense.create({
        data: {
          groupId: parseInt(groupId),
          paidBy: parseInt(paidBy),
          description,
          amount: new Prisma.Decimal(numericAmount),
          currency,
          exchangeRateToInr: currency !== 'INR' ? new Prisma.Decimal(rate) : null,
          amountInInr: new Prisma.Decimal(amountInInr),
          splitType,
          expenseDate: parsedDate,
          isSettlement: false,
          source: 'manual'
        }
      });

      // Insert splits
      await tx.expenseSplit.createMany({
        data: resolvedSplits.map(s => ({
          expenseId: expense.id,
          userId: s.userId,
          shareAmount: new Prisma.Decimal(s.shareAmount),
          shareValue: new Prisma.Decimal(s.shareValue)
        }))
      });

      return tx.expense.findUnique({
        where: { id: expense.id },
        include: {
          splits: {
            include: {
              user: { select: { id: true, name: true } }
            }
          },
          payer: { select: { id: true, name: true } }
        }
      });
    });

    res.status(201).json(savedExpense);
  } catch (error) {
    console.error('Failed to create manual expense:', error);
    res.status(500).json({ error: 'Failed to save expense to database' });
  }
});

// Get Group Expenses
router.get('/group/:groupId', authenticateToken, async (req, res) => {
  const groupId = parseInt(req.params.groupId);

  if (isNaN(groupId)) {
    return res.status(400).json({ error: 'Invalid group ID' });
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        groupId,
        isSettlement: false
      },
      include: {
        payer: { select: { id: true, name: true, email: true } },
        splits: {
          include: {
            user: { select: { id: true, name: true, email: true } }
          }
        }
      },
      orderBy: {
        expenseDate: 'desc'
      }
    });

    res.json(expenses);
  } catch (error) {
    console.error('Failed to fetch group expenses:', error);
    res.status(500).json({ error: 'Failed to fetch group expenses' });
  }
});

// Delete Expense
router.delete('/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid expense ID' });
  }

  try {
    const expense = await prisma.expense.findUnique({ where: { id } });
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await prisma.expense.delete({ where: { id } });
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Failed to delete expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

module.exports = router;
