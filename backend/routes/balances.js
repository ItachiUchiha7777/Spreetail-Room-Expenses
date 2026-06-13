const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const authenticateToken = require('../middleware/auth');

// Get Group Balance Summary & Simplified Debts
router.get('/group/:groupId', authenticateToken, async (req, res) => {
  const groupId = parseInt(req.params.groupId);

  if (isNaN(groupId)) {
    return res.status(400).json({ error: 'Invalid group ID' });
  }

  try {
    // 1. Get all memberships (including left ones) to get user list
    const memberships = await prisma.groupMembership.findMany({
      where: { groupId },
      include: {
        user: { select: { id: true, name: true, email: true } }
      }
    });

    if (memberships.length === 0) {
      return res.status(404).json({ error: 'Group membership list is empty or group does not exist' });
    }

    // Unique users list
    const userMap = new Map();
    memberships.forEach(m => {
      userMap.set(m.user.id, {
        id: m.user.id,
        name: m.user.name,
        email: m.user.email,
        joinedAt: m.joinedAt,
        leftAt: m.leftAt
      });
    });

    const users = Array.from(userMap.values());

    // 2. Fetch all expenses and splits for the group
    const expenses = await prisma.expense.findMany({
      where: { groupId, isSettlement: false },
      include: { splits: true }
    });

    // 3. Fetch all settlements
    const settlements = await prisma.settlement.findMany({
      where: { groupId }
    });

    // 4. Calculate Paid & Owed per user
    const userSummary = {};
    users.forEach(u => {
      userSummary[u.id] = {
        id: u.id,
        name: u.name,
        email: u.email,
        paid: 0.0,
        owed: 0.0,
        settlementsPaid: 0.0,
        settlementsReceived: 0.0,
        netBalance: 0.0
      };
    });

    expenses.forEach(exp => {
      const payerId = exp.paidBy;
      const amountInInr = parseFloat(exp.amountInInr.toString());

      if (userSummary[payerId]) {
        userSummary[payerId].paid += amountInInr;
      }

      exp.splits.forEach(split => {
        const participantId = split.userId;
        const shareAmount = parseFloat(split.shareAmount.toString());

        if (userSummary[participantId]) {
          userSummary[participantId].owed += shareAmount;
        }
      });
    });

    settlements.forEach(set => {
      const payerId = set.paidBy;
      const payeeId = set.paidTo;
      const amount = parseFloat(set.amount.toString());

      if (userSummary[payerId]) {
        userSummary[payerId].settlementsPaid += amount;
      }
      if (userSummary[payeeId]) {
        userSummary[payeeId].settlementsReceived += amount;
      }
    });

    // 5. Calculate net balance: paid - owed + settlementsPaid - settlementsReceived
    const balanceList = [];
    Object.keys(userSummary).forEach(id => {
      const summary = userSummary[id];
      summary.netBalance = parseFloat((summary.paid - summary.owed + summary.settlementsPaid - summary.settlementsReceived).toFixed(2));
      balanceList.push(summary);
    });

    // 6. Greedy Debt-Simplification Algorithm
    // Create copy for calculations
    const debts = balanceList.map(u => ({
      id: u.id,
      name: u.name,
      balance: u.netBalance
    }));

    const simplifiedDebts = [];
    
    // Split into debtors and creditors
    let debtors = debts.filter(d => d.balance < -0.01).sort((a, b) => a.balance - b.balance); // Sorted descending by absolute debt
    let creditors = debts.filter(d => d.balance > 0.01).sort((a, b) => b.balance - a.balance); // Sorted descending

    let safetyCounter = 0;
    const maxIterations = debts.length * debts.length;

    while (debtors.length > 0 && creditors.length > 0 && safetyCounter < maxIterations) {
      safetyCounter++;
      const debtor = debtors[0];
      const creditor = creditors[0];

      const amountToPay = Math.min(-debtor.balance, creditor.balance);
      const roundedAmount = parseFloat(amountToPay.toFixed(2));

      if (roundedAmount > 0.01) {
        simplifiedDebts.push({
          from: debtor.id,
          fromName: debtor.name,
          to: creditor.id,
          toName: creditor.name,
          amount: roundedAmount
        });
      }

      debtor.balance += roundedAmount;
      creditor.balance -= roundedAmount;

      // Update lists
      if (Math.abs(debtor.balance) < 0.01) {
        debtors.shift();
      } else {
        debtors.sort((a, b) => a.balance - b.balance);
      }

      if (Math.abs(creditor.balance) < 0.01) {
        creditors.shift();
      } else {
        creditors.sort((a, b) => b.balance - a.balance);
      }
    }

    res.json({
      balances: balanceList,
      debts: simplifiedDebts
    });
  } catch (error) {
    console.error('Failed to calculate group balances:', error);
    res.status(500).json({ error: 'Failed to calculate group balances' });
  }
});

// Rohan's View: Drill-down transaction history details for a user in a group
router.get('/group/:groupId/user/:userId/breakdown', authenticateToken, async (req, res) => {
  const groupId = parseInt(req.params.groupId);
  const userId = parseInt(req.params.userId);

  if (isNaN(groupId) || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    // 1. Fetch expenses paid by this user
    const paidExpenses = await prisma.expense.findMany({
      where: { groupId, paidBy: userId, isSettlement: false },
      select: {
        id: true,
        description: true,
        amount: true,
        currency: true,
        amountInInr: true,
        expenseDate: true
      },
      orderBy: { expenseDate: 'desc' }
    });

    // 2. Fetch splits (what they owe for other people's / their own expenses)
    const owedSplits = await prisma.expenseSplit.findMany({
      where: {
        userId,
        expense: { groupId, isSettlement: false }
      },
      include: {
        expense: {
          include: {
            payer: { select: { name: true } }
          }
        }
      },
      orderBy: {
        expense: { expenseDate: 'desc' }
      }
    });

    // 3. Fetch settlements paid by this user
    const sentSettlements = await prisma.settlement.findMany({
      where: { groupId, paidBy: userId },
      include: {
        payee: { select: { name: true } }
      },
      orderBy: { settledDate: 'desc' }
    });

    // 4. Fetch settlements received by this user
    const receivedSettlements = await prisma.settlement.findMany({
      where: { groupId, paidTo: userId },
      include: {
        payer: { select: { name: true } }
      },
      orderBy: { settledDate: 'desc' }
    });

    res.json({
      paid: paidExpenses.map(e => ({
        id: e.id,
        description: e.description,
        amount: parseFloat(e.amount.toString()),
        amountInInr: parseFloat(e.amountInInr.toString()),
        currency: e.currency,
        date: e.expenseDate
      })),
      owed: owedSplits.map(s => ({
        id: s.id,
        description: s.expense.description,
        paidBy: s.expense.payer.name,
        totalAmountInInr: parseFloat(s.expense.amountInInr.toString()),
        shareAmountInInr: parseFloat(s.shareAmount.toString()),
        shareValue: parseFloat(s.shareValue.toString()),
        splitType: s.expense.splitType,
        date: s.expense.expenseDate
      })),
      settlementsSent: sentSettlements.map(s => ({
        id: s.id,
        to: s.payee.name,
        amount: parseFloat(s.amount.toString()),
        currency: s.currency,
        date: s.settledDate,
        note: s.note
      })),
      settlementsReceived: receivedSettlements.map(s => ({
        id: s.id,
        from: s.payer.name,
        amount: parseFloat(s.amount.toString()),
        currency: s.currency,
        date: s.settledDate,
        note: s.note
      }))
    });
  } catch (error) {
    console.error('Failed to fetch user breakdown:', error);
    res.status(500).json({ error: 'Failed to fetch user breakdown' });
  }
});

module.exports = router;
