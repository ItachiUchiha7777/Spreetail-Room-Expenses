const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');
const authenticateToken = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeyforflatmatesapp123!';

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields (name, email, password) are required' });
  }

  try {
    // Check if email or name already exists
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const existingName = await prisma.user.findUnique({ where: { name } });
    if (existingName) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Google OAuth login/registration
router.post('/google', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  try {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // If user name already exists, append a random string
      let targetName = name;
      const existingName = await prisma.user.findUnique({ where: { name: targetName } });
      if (existingName) {
        targetName = `${name} ${Math.floor(100 + Math.random() * 900)}`;
      }

      // Generate a mock hash for safety (cannot log in with password directly)
      const mockHash = await bcrypt.hash(Math.random().toString(36), 10);

      user = await prisma.user.create({
        data: {
          name: targetName,
          email,
          passwordHash: mockHash
        }
      });
      console.log(`Created new Google OAuth user: ${user.name} (${user.email})`);
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ error: 'Failed to process Google login' });
  }
});

// Get current user details
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
