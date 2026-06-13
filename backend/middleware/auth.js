const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(411).json({ error: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkeyforflatmatesapp123!');
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true }
    });

    if (!user) {
      return res.status(403).json({ error: 'User associated with token no longer exists' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
