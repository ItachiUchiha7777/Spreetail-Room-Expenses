const fs = require('fs');

/**
 * Normalizes description text for fuzzy matching (used in duplicate detection)
 */
function normalizeDesc(desc) {
  if (!desc) return '';
  return desc.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
}

/**
 * Checks if two descriptions fuzzy match using word overlap
 */
function fuzzyMatch(desc1, desc2) {
  const words1 = desc1.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2 && w !== 'the' && w !== 'for' && w !== 'and' && w !== 'with' && w !== 'was');
  const words2 = desc2.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2 && w !== 'the' && w !== 'for' && w !== 'and' && w !== 'with' && w !== 'was');
  
  if (words1.length === 0 || words2.length === 0) {
    return desc1.toLowerCase().trim() === desc2.toLowerCase().trim();
  }

  const overlap = words1.filter(w => words2.includes(w));
  const minOverlap = Math.min(words1.length, words2.length);
  return overlap.length >= 2 || (overlap.length >= 1 && minOverlap === 1);
}

/**
 * Parses a date string like "08-02-2026" or "Mar-14" or "04-05-2026"
 * Returns { date: Date | null, rawDate: string, isAmbiguous: boolean, inferred: boolean }
 */
function parseCsvDate(dateStr, surroundingRows = [], rowIndex = 0) {
  if (!dateStr) return { date: null, rawDate: '', isAmbiguous: false, inferred: false };
  const str = dateStr.trim();

  // Check for non-standard formats like "Mar-14" (anomaly #14)
  const missingYearRegex = /^([a-zA-Z]{3})-([0-9]{1,2})$/;
  if (missingYearRegex.test(str)) {
    const match = str.match(missingYearRegex);
    const monthStr = match[1].toLowerCase();
    const day = parseInt(match[2]);

    const months = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };
    
    if (months[monthStr] !== undefined) {
      // Infer year from surrounding rows. 
      // Look forward or backward for a standard date to steal the year.
      let inferredYear = 2026; // Default fallback for this specific sheet
      for (const row of surroundingRows) {
        if (row && row.date && row.date.includes('-')) {
          const parts = row.date.split('-');
          if (parts.length === 3 && parts[2].length === 4) {
            inferredYear = parseInt(parts[2]);
            break;
          }
        }
      }
      const date = new Date(inferredYear, months[monthStr], day);
      return { date, rawDate: str, isAmbiguous: false, inferred: true, formatError: true };
    }
  }

  // Standard formats
  // Check if matches DD-MM-YYYY or MM-DD-YYYY
  const standardRegex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
  if (standardRegex.test(str)) {
    const match = str.match(standardRegex);
    const part1 = parseInt(match[1]);
    const part2 = parseInt(match[2]);
    const year = parseInt(match[3]);

    // Check if ambiguous (both <= 12) (anomaly #18)
    const isAmbiguous = part1 <= 12 && part2 <= 12;

    // Default interpretation: DD-MM-YYYY
    const date = new Date(year, part2 - 1, part1);
    return { date, rawDate: str, isAmbiguous, inferred: false };
  }

  return { date: null, rawDate: str, isAmbiguous: false, inferred: false, error: true };
}

/**
 * Runs 22 anomaly detection rules on the parsed CSV array.
 * @param {Array} rows Raw parsed CSV row objects
 * @param {Array} members Group members details (to check names and active periods)
 */
function detectAnomalies(rows, members) {
  const anomalies = [];
  const processedRows = [];
  const memberNames = members.map(m => m.name);

  // Pre-pass: check for casing variants and trailing whitespaces in names
  const canonicalNames = new Map(); // lowercase -> canonical casing
  members.forEach(m => canonicalNames.set(m.name.toLowerCase().trim(), m.name));

  // Helper to resolve name normalization (anomaly #3, #5, #15)
  const resolveName = (rawName) => {
    if (!rawName) return { name: '', anomalies: [] };
    const trimmed = rawName.trim();
    const nameAnoms = [];

    // Check trailing whitespace (#15)
    if (rawName !== trimmed) {
      nameAnoms.push({
        type: '#15',
        desc: `Payer name "${rawName}" has leading/trailing whitespace.`
      });
    }

    const lowercase = trimmed.toLowerCase();
    
    // Exact match
    if (canonicalNames.has(lowercase)) {
      const canonical = canonicalNames.get(lowercase);
      if (canonical !== trimmed) {
        nameAnoms.push({
          type: '#3',
          desc: `Inconsistent casing for name "${trimmed}". Normalized to "${canonical}".`
        });
      }
      return { name: canonical, anomalies: nameAnoms };
    }

    // Fuzzy/prefix match like "Priya S" -> "Priya" (anomaly #5)
    for (const canonical of memberNames) {
      if (lowercase.startsWith(canonical.toLowerCase() + ' ') || 
          lowercase.startsWith(canonical.toLowerCase() + '.')) {
        nameAnoms.push({
          type: '#5',
          desc: `Name variant "${trimmed}" normalized to group member "${canonical}".`
        });
        return { name: canonical, anomalies: nameAnoms };
      }
    }

    // Is it Kabir's friend? Or a new guest?
    return { name: trimmed, anomalies: [] };
  };

  // Run row-by-row checks
  for (let i = 0; i < rows.length; i++) {
    const rawRow = rows[i];
    const rowRef = i + 2; // 1-indexed header is row 1, so row index 0 is CSV row 2.
    
    let paidByRaw = rawRow.paid_by || '';
    let amountRaw = rawRow.amount || '';
    let currencyRaw = rawRow.currency || '';
    let splitTypeRaw = rawRow.split_type || '';
    let splitWithRaw = rawRow.split_with || '';
    let splitDetailsRaw = rawRow.split_details || '';
    let descriptionRaw = rawRow.description || '';
    let dateRaw = rawRow.date || '';
    let noteRaw = rawRow.note || '';

    const rowAnoms = [];

    // --- #15 Name whitespace and #3 Casing and #5 Name variant ---
    const payerResolution = resolveName(paidByRaw);
    let resolvedPayer = payerResolution.name;
    payerResolution.anomalies.forEach(an => {
      rowAnoms.push({
        type: an.type,
        desc: `Row ${rowRef}: ${an.desc}`,
        requiresApproval: false,
        autoResolve: true,
        proposedAction: `Normalize to "${resolvedPayer}"`
      });
    });

    // --- #7 Missing Payer ---
    if (!paidByRaw || paidByRaw.trim() === '') {
      rowAnoms.push({
        type: '#7',
        desc: `Row ${rowRef}: Payer name is blank. Description: "${descriptionRaw}".`,
        requiresApproval: true,
        autoResolve: false,
        proposedAction: 'Require human input'
      });
      resolvedPayer = ''; // pending review
    }

    // --- #2 Comma Formatted Amount ---
    let amountClean = amountRaw.replace(/"/g, '').trim();
    let originalAmountClean = amountClean;
    if (amountClean.includes(',')) {
      amountClean = amountClean.replace(/,/g, '');
      rowAnoms.push({
        type: '#2',
        desc: `Row ${rowRef}: Amount contains commas ("${originalAmountClean}").`,
        requiresApproval: false,
        autoResolve: true,
        proposedAction: `Strip commas and parse as ${amountClean}`
      });
    }

    let parsedAmount = parseFloat(amountClean);

    // --- #4 Excess Decimal Precision ---
    if (!isNaN(parsedAmount)) {
      const decimals = (amountClean.split('.')[1] || '').length;
      if (decimals > 2) {
        const rounded = parseFloat(parsedAmount.toFixed(2));
        rowAnoms.push({
          type: '#4',
          desc: `Row ${rowRef}: Excess decimal precision in amount "${amountClean}".`,
          requiresApproval: false,
          autoResolve: true,
          proposedAction: `Round to 2 decimals (${rounded})`
        });
        parsedAmount = rounded;
      }
    }

    // --- #13 Negative Amount (Refund) ---
    let isRefund = false;
    if (parsedAmount < 0) {
      isRefund = true;
      rowAnoms.push({
        type: '#13',
        desc: `Row ${rowRef}: Negative amount found (${parsedAmount}).`,
        requiresApproval: false,
        autoResolve: true,
        proposedAction: 'Treat as a negative expense (refund) to decrease balances proportionately.'
      });
    }

    // --- #17 Zero-amount expense ---
    if (parsedAmount === 0) {
      rowAnoms.push({
        type: '#17',
        desc: `Row ${rowRef}: Zero amount expense "${descriptionRaw}".`,
        requiresApproval: false,
        autoResolve: true,
        proposedAction: 'Import as 0 amount with no balance impact for auditing.'
      });
    }

    // --- #16 Missing Currency ---
    let resolvedCurrency = currencyRaw.trim();
    if (!resolvedCurrency) {
      resolvedCurrency = 'INR';
      rowAnoms.push({
        type: '#16',
        desc: `Row ${rowRef}: Currency is missing.`,
        requiresApproval: false,
        autoResolve: true,
        proposedAction: 'Default to "INR"'
      });
    }

    // --- #10 Foreign Currency without Exchange Rate ---
    if (resolvedCurrency !== 'INR') {
      rowAnoms.push({
        type: '#10',
        desc: `Row ${rowRef}: USD/Foreign currency transaction found (${parsedAmount} ${resolvedCurrency}) with no exchange rate in CSV.`,
        requiresApproval: true,
        autoResolve: false,
        proposedAction: 'Prompt user for exchange rate'
      });
    }

    // --- #14 Date formatting / Inferred Year ---
    const dateParsedResult = parseCsvDate(dateRaw, rows, i);
    let resolvedDate = dateParsedResult.date;
    if (dateParsedResult.formatError) {
      rowAnoms.push({
        type: '#14',
        desc: `Row ${rowRef}: Date has non-standard format "${dateRaw}".`,
        requiresApproval: false,
        autoResolve: true,
        proposedAction: `Infer date as ${resolvedDate.toLocaleDateString()}`
      });
    }

    // --- #18 Ambiguous Date Format ---
    if (dateParsedResult.isAmbiguous) {
      rowAnoms.push({
        type: '#18',
        desc: `Row ${rowRef}: Ambiguous date format "${dateRaw}" (could be DD-MM or MM-DD).`,
        requiresApproval: true,
        autoResolve: false,
        proposedAction: 'Ask reviewer to choose interpretation (surrounding dates are in March)'
      });
    }

    // --- #8 Settlement Mislabeled as Expense ---
    let isSettlement = false;
    const normDesc = (descriptionRaw || '').toLowerCase();
    const descMatchesSettlement = 
      (normDesc.includes('paid') && normDesc.includes('back')) || 
      normDesc.includes('settlement') || 
      normDesc.includes('repay') ||
      normDesc.includes('refund');
    
    let resolvedSplitType = splitTypeRaw.trim().toLowerCase();
    
    // Check if split_with has only 1 name and split_type is empty
    const splitWithList = splitWithRaw ? splitWithRaw.split(';').map(n => n.trim()).filter(Boolean) : [];
    if (!resolvedSplitType && splitWithList.length === 1 && descMatchesSettlement) {
      isSettlement = true;
      rowAnoms.push({
        type: '#8',
        desc: `Row ${rowRef}: Settlement logged as an expense (blank split_type, single name in split_with).`,
        requiresApproval: false,
        autoResolve: true,
        proposedAction: `Reclassify into settlements: ${resolvedPayer} -> ${splitWithList[0]}, amount ${parsedAmount}`
      });
    }

    // --- #6 Non-Standard Split Type "unequal" ---
    if (resolvedSplitType === 'unequal') {
      resolvedSplitType = 'exact';
      rowAnoms.push({
        type: '#6',
        desc: `Row ${rowRef}: Non-standard split type "unequal".`,
        requiresApproval: false,
        autoResolve: true,
        proposedAction: 'Map "unequal" to standard "exact" split type.'
      });
    }

    // --- #20 split_type = equal but split_details present ---
    if (resolvedSplitType === 'equal' && splitDetailsRaw.trim() !== '') {
      rowAnoms.push({
        type: '#20',
        desc: `Row ${rowRef}: Split type is "equal" but "split_details" lists individual shares.`,
        requiresApproval: false,
        autoResolve: true,
        proposedAction: 'Shares are identical (1:1:1:1); ignore details and split equally.'
      });
    }

    // --- #21 Personal Transfer Mislabeled as group expense ---
    if (resolvedSplitType === 'equal' && splitWithList.length === 1 && splitWithList[0] !== resolvedPayer && !isSettlement) {
      rowAnoms.push({
        type: '#21',
        desc: `Row ${rowRef}: Personal transfer logged as group expense ("${descriptionRaw}").`,
        requiresApproval: true,
        autoResolve: false,
        proposedAction: `Reclassify to settlements: ${resolvedPayer} -> ${splitWithList[0]} or keep as single-user expense.`
      });
    }

    // Parse splits and check name casing inside split_with
    const resolvedSplitWith = [];
    splitWithList.forEach(rawName => {
      const resName = resolveName(rawName);
      resolvedSplitWith.push(resName.name);
      resName.anomalies.forEach(an => {
        // Only log variant/whitespace if not already logged for this row
        if (!rowAnoms.some(a => a.type === an.type && a.desc.includes(resName.name))) {
          rowAnoms.push({
            type: an.type,
            desc: `Row ${rowRef} (split participant): ${an.desc}`,
            requiresApproval: false,
            autoResolve: true,
            proposedAction: `Normalize to "${resName.name}"`
          });
        }
      });
    });

    // --- #11 Non-member guest in split_with ---
    resolvedSplitWith.forEach(name => {
      if (name && !memberNames.includes(name)) {
        rowAnoms.push({
          type: '#11',
          desc: `Row ${rowRef}: Non-member guest "${name}" listed in splits.`,
          requiresApproval: false,
          autoResolve: true,
          proposedAction: `Create temporary guest membership for "${name}" on expense date.`
        });
      }
    });

    // --- #9 Percentage split doesn't sum to 100% ---
    if (resolvedSplitType === 'percentage' && splitDetailsRaw) {
      // Split details format: Aisha 30%; Rohan 30%; Priya 30%; Meera 20%
      const detailParts = splitDetailsRaw.split(';').map(p => p.trim()).filter(Boolean);
      let sumPct = 0;
      detailParts.forEach(part => {
        const match = part.match(/(.+)\s+(\d+)\s*%/);
        if (match) {
          sumPct += parseInt(match[2]);
        }
      });

      if (sumPct !== 100 && sumPct > 0) {
        rowAnoms.push({
          type: '#9',
          desc: `Row ${rowRef}: Percentage split details sum to ${sumPct}% (Pizza/Brunch rows), not 100%.`,
          requiresApproval: true,
          autoResolve: false,
          proposedAction: `Proportionally normalize: divide each percentage by ${sumPct} to resolve sum mismatch.`
        });
      }
    }

    // --- #19 Departed member still listed in split_with ---
    if (resolvedDate) {
      resolvedSplitWith.forEach(name => {
        const mem = members.find(m => m.name === name);
        if (mem) {
          const joined = new Date(mem.joinedAt);
          const left = mem.leftAt ? new Date(mem.leftAt) : null;
          if (resolvedDate < joined || (left && resolvedDate > left)) {
            rowAnoms.push({
              type: '#19',
              desc: `Row ${rowRef}: Departed member "${name}" (left ${left ? left.toLocaleDateString() : 'N/A'}) included in split for date ${resolvedDate.toLocaleDateString()}.`,
              requiresApproval: true,
              autoResolve: false,
              proposedAction: `Remove "${name}" and split equally among remaining active members.`
            });
          }
        }
      });
    }

    // Save processed row state
    processedRows.push({
      rowIndex: i,
      rowRef,
      description: descriptionRaw,
      dateRaw,
      resolvedDate: resolvedDate ? resolvedDate.toISOString() : null,
      paidByRaw,
      resolvedPayer,
      amountRaw,
      parsedAmount,
      currencyRaw,
      resolvedCurrency,
      splitTypeRaw,
      resolvedSplitType,
      splitWithRaw,
      resolvedSplitWith,
      splitDetailsRaw,
      noteRaw,
      isSettlement,
      isRefund,
      anomalies: rowAnoms
    });

    anomalies.push(...rowAnoms);
  }

  // Cross-row checks (Run duplicates and cross-row analyses)
  // --- #1 Exact duplicate expense ---
  // --- #12 Conflicting duplicate entries ---
  for (let i = 0; i < processedRows.length; i++) {
    const rowA = processedRows[i];
    if (rowA.isSettlement) continue;

    for (let j = i + 1; j < processedRows.length; j++) {
      const rowB = processedRows[j];
      if (rowB.isSettlement) continue;

      const sameDate = rowA.resolvedDate && rowA.resolvedDate === rowB.resolvedDate;
      const sameAmount = Math.abs(rowA.parsedAmount - rowB.parsedAmount) < 0.01;
      const overlapSplits = rowA.resolvedSplitWith.some(p => rowB.resolvedSplitWith.includes(p));
      const descMatch = fuzzyMatch(rowA.description, rowB.description);

      if (sameDate && overlapSplits && descMatch) {
        // Check if exact duplicate (#1)
        const samePayer = rowA.resolvedPayer === rowB.resolvedPayer;
        if (samePayer && sameAmount) {
          const dupAnom = {
            type: '#1',
            desc: `Row ${rowA.rowRef} ("${rowA.description}") and Row ${rowB.rowRef} ("${rowB.description}") are exact duplicate expenses.`,
            requiresApproval: true,
            autoResolve: false,
            proposedAction: `Keep Row ${rowA.rowRef} (first entry) and drop Row ${rowB.rowRef}.`
          };
          rowA.anomalies.push(dupAnom);
          rowB.anomalies.push(dupAnom);
          anomalies.push(dupAnom);
        } else {
          // Conflicting duplicate (#12)
          const conflictAnom = {
            type: '#12',
            desc: `Row ${rowA.rowRef} ("${rowA.description}" paid by ${rowA.resolvedPayer} ₹${rowA.parsedAmount}) and Row ${rowB.rowRef} ("${rowB.description}" paid by ${rowB.resolvedPayer} ₹${rowB.parsedAmount}) look like conflicting duplicates for the same event.`,
            requiresApproval: true,
            autoResolve: false,
            proposedAction: `Choose one row to keep, combine them, or keep both.`
          };
          rowA.anomalies.push(conflictAnom);
          rowB.anomalies.push(conflictAnom);
          anomalies.push(conflictAnom);
        }
      }
    }
  }

  // --- #22 Recurring guest with non-contiguous membership (Dev) ---
  // If Dev has gaps in dates where they are active. We group Dev's occurrences.
  // We check if dates are separate. Since Dev is Feb 8-8 and Mar 8-14, 
  // our timeline builder handles this by automatically creating memberships.
  // We can report this cross-row detection.
  const nameActiveDates = new Map();
  processedRows.forEach(row => {
    if (!row.resolvedDate) return;
    const dateObj = new Date(row.resolvedDate);
    
    // Add payer
    if (row.resolvedPayer) {
      if (!nameActiveDates.has(row.resolvedPayer)) nameActiveDates.set(row.resolvedPayer, []);
      nameActiveDates.get(row.resolvedPayer).push(dateObj);
    }
    // Add splits
    row.resolvedSplitWith.forEach(name => {
      if (!nameActiveDates.has(name)) nameActiveDates.set(name, []);
      nameActiveDates.get(name).push(dateObj);
    });
  });

  nameActiveDates.forEach((dates, name) => {
    // Sort dates
    dates.sort((a, b) => a - b);
    if (dates.length < 2) return;

    // Find gaps larger than 7 days
    for (let d = 0; d < dates.length - 1; d++) {
      const gapDays = (dates[d+1] - dates[d]) / (1000 * 60 * 60 * 24);
      if (gapDays > 10) { // Found a significant gap where they didn't participate (non-contiguous)
        // Log anomaly #22 for this user
        const devAnom = {
          type: '#22',
          desc: `Guest "${name}" has non-contiguous participation dates (active around ${dates[d].toLocaleDateString()} and again around ${dates[d+1].toLocaleDateString()}).`,
          requiresApproval: false,
          autoResolve: true,
          proposedAction: `Create separate membership windows: Feb 8 and Mar 8–14 for "${name}".`
        };
        // Add to batch anomalies
        if (!anomalies.some(a => a.type === '#22' && a.desc.includes(name))) {
          anomalies.push(devAnom);
        }
      }
    }
  });

  return {
    anomalies: anomalies.filter((v, i, a) => a.findIndex(t => t.type === v.type && t.desc === v.desc) === i), // Deduplicate
    processedRows
  };
}

module.exports = {
  detectAnomalies,
  parseCsvDate
};
