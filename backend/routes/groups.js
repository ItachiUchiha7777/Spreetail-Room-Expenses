const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const authenticateToken = require('../middleware/auth');

// Create Group
router.post('/', authenticateToken, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Group name is required' });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Create group
      const group = await tx.group.create({
        data: {
          name,
          createdBy: req.user.id,
        }
      });

      // Creator is a member from now
      await tx.groupMembership.create({
        data: {
          groupId: group.id,
          userId: req.user.id,
          joinedAt: new Date(),
        }
      });

      return group;
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Group creation error:', error);
    res.status(500).json({ error: 'Failed to create group' });
  }
});

// List User's Groups
router.get('/', authenticateToken, async (req, res) => {
  try {
    const groups = await prisma.group.findMany({
      where: {
        memberships: {
          some: {
            userId: req.user.id
          }
        }
      },
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(groups);
  } catch (error) {
    console.error('Failed to list groups:', error);
    res.status(500).json({ error: 'Failed to list groups' });
  }
});

// Get Group Details
router.get('/:id', authenticateToken, async (req, res) => {
  const groupId = parseInt(req.params.id);

  if (isNaN(groupId)) {
    return res.status(400).json({ error: 'Invalid group ID' });
  }

  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        },
        memberships: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            }
          },
          orderBy: {
            joinedAt: 'asc'
          }
        }
      }
    });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Check membership
    const isMember = group.memberships.some(m => m.userId === req.user.id);
    if (!isMember) {
      return res.status(403).json({ error: 'You are not a member of this group' });
    }

    res.json(group);
  } catch (error) {
    console.error('Failed to get group details:', error);
    res.status(500).json({ error: 'Failed to get group details' });
  }
});

// Add Membership (or guest stint) to Group
router.post('/:id/members', authenticateToken, async (req, res) => {
  const groupId = parseInt(req.params.id);
  const { userId, joinedAt, leftAt } = req.body;

  if (isNaN(groupId)) {
    return res.status(400).json({ error: 'Invalid group ID' });
  }

  if (!userId || !joinedAt) {
    return res.status(400).json({ error: 'User ID and join date are required' });
  }

  try {
    // Check if group exists
    const group = await prisma.group.findUnique({ where: { id: groupId } });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Check if user exists
    const targetUser = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const membership = await prisma.groupMembership.create({
      data: {
        groupId,
        userId: parseInt(userId),
        joinedAt: new Date(joinedAt),
        leftAt: leftAt ? new Date(leftAt) : null
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json(membership);
  } catch (error) {
    console.error('Failed to add membership:', error);
    res.status(500).json({ error: 'Failed to add membership' });
  }
});

// Update Membership (e.g., set leftAt date, or correct dates)
router.put('/:id/members/:membershipId', authenticateToken, async (req, res) => {
  const membershipId = parseInt(req.params.membershipId);
  const { joinedAt, leftAt } = req.body;

  if (isNaN(membershipId)) {
    return res.status(400).json({ error: 'Invalid membership ID' });
  }

  try {
    const existing = await prisma.groupMembership.findUnique({ where: { id: membershipId } });
    if (!existing) {
      return res.status(404).json({ error: 'Membership not found' });
    }

    const updated = await prisma.groupMembership.update({
      where: { id: membershipId },
      data: {
        joinedAt: joinedAt ? new Date(joinedAt) : existing.joinedAt,
        leftAt: leftAt ? new Date(leftAt) : existing.leftAt
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json(updated);
  } catch (error) {
    console.error('Failed to update membership:', error);
    res.status(500).json({ error: 'Failed to update membership' });
  }
});

// Delete Membership
router.delete('/:id/members/:membershipId', authenticateToken, async (req, res) => {
  const membershipId = parseInt(req.params.membershipId);

  if (isNaN(membershipId)) {
    return res.status(400).json({ error: 'Invalid membership ID' });
  }

  try {
    await prisma.groupMembership.delete({
      where: { id: membershipId }
    });

    res.json({ message: 'Membership removed successfully' });
  } catch (error) {
    console.error('Failed to delete membership:', error);
    res.status(500).json({ error: 'Failed to delete membership' });
  }
});

// Join group by unique UUID code
router.post('/join', authenticateToken, async (req, res) => {
  const { uuid } = req.body;

  if (!uuid) {
    return res.status(400).json({ error: 'Group UUID code is required' });
  }

  try {
    const group = await prisma.group.findUnique({
      where: { uuid },
      include: { memberships: true }
    });

    if (!group) {
      return res.status(404).json({ error: 'Group not found with this code' });
    }

    // Check if user is already a member
    const existingMembership = group.memberships.find(m => m.userId === req.user.id);
    if (existingMembership) {
      // Already in the group, return details
      return res.json({ message: 'Already a member of this group', group });
    }

    // Add user as member
    await prisma.groupMembership.create({
      data: {
        groupId: group.id,
        userId: req.user.id,
        joinedAt: new Date()
      }
    });

    res.json({ message: 'Successfully joined group', group });
  } catch (error) {
    console.error('Failed to join group:', error);
    res.status(500).json({ error: 'Failed to join group' });
  }
});

// Get group metadata by UUID
router.get('/by-uuid/:uuid', authenticateToken, async (req, res) => {
  const { uuid } = req.params;

  try {
    const group = await prisma.group.findUnique({
      where: { uuid },
      select: {
        id: true,
        uuid: true,
        name: true,
        creator: { select: { name: true } }
      }
    });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json(group);
  } catch (error) {
    console.error('Failed to fetch group by uuid:', error);
    res.status(500).json({ error: 'Failed to fetch group information' });
  }
});

module.exports = router;
