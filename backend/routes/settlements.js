const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const authenticateToken = require('../middleware/auth');
const { Prisma } = require('@prisma/client');

// Record Settlement
router.post('/', authenticateToken, async (req, res) => {
  const {
    groupId,
    paidBy,
    paidTo,
    amount,
    currency,
    settledDate,
    note
  } = req.body;

  if (!groupId || !paidBy || !paidTo || amount === undefined || !settledDate) {
    return res.status(400).json({ error: 'Missing required settlement fields' });
  }

  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  try {
    // Check if group exists
    const group = await prisma.group.findUnique({
      where: { id: parseInt(groupId) },
      include: { memberships: true }
    });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Check if users exist in group
    const isPayerMember = group.memberships.some(m => m.userId === parseInt(paidBy));
    const isPayeeMember = group.memberships.some(m => m.userId === parseInt(paidTo));

    if (!isPayerMember || !isPayeeMember) {
      return res.status(400).json({ error: 'Both participants must be members of the group' });
    }

    // Create settlement
    const settlement = await prisma.settlement.create({
      data: {
        groupId: parseInt(groupId),
        paidBy: parseInt(paidBy),
        paidTo: parseInt(paidTo),
        amount: new Prisma.Decimal(numericAmount),
        currency: currency || 'INR',
        settledDate: new Date(settledDate),
        note: note || ''
      },
      include: {
        payer: { select: { id: true, name: true } },
        payee: { select: { id: true, name: true } }
      }
    });

    res.status(201).json(settlement);
  } catch (error) {
    console.error('Failed to create settlement:', error);
    res.status(500).json({ error: 'Failed to save settlement' });
  }
});

// Get Group Settlements
router.get('/group/:groupId', authenticateToken, async (req, res) => {
  const groupId = parseInt(req.params.groupId);

  if (isNaN(groupId)) {
    return res.status(400).json({ error: 'Invalid group ID' });
  }

  try {
    const settlements = await prisma.settlement.findMany({
      where: { groupId },
      include: {
        payer: { select: { id: true, name: true, email: true } },
        payee: { select: { id: true, name: true, email: true } }
      },
      orderBy: {
        settledDate: 'desc'
      }
    });

    res.json(settlements);
  } catch (error) {
    console.error('Failed to fetch settlements:', error);
    res.status(500).json({ error: 'Failed to fetch settlements' });
  }
});

// Delete Settlement
router.delete('/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid settlement ID' });
  }

  try {
    const settlement = await prisma.settlement.findUnique({ where: { id } });
    if (!settlement) {
      return res.status(404).json({ error: 'Settlement not found' });
    }

    await prisma.settlement.delete({ where: { id } });
    res.json({ message: 'Settlement deleted successfully' });
  } catch (error) {
    console.error('Failed to delete settlement:', error);
    res.status(500).json({ error: 'Failed to delete settlement' });
  }
});

module.exports = router;
