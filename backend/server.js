require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./prismaClient');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for development and ease of testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' })); // Support larger payloads for CSV import

// Import routes
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/groups');
const expenseRoutes = require('./routes/expenses');
const balanceRoutes = require('./routes/balances');
const settlementRoutes = require('./routes/settlements');
const importRoutes = require('./routes/import');

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    // Basic ping to DB
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', database: 'Disconnected', error: error.message });
  }
});

// Route registration
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/balances', balanceRoutes);
app.use('/api/settlements', settlementRoutes);
app.use('/api/import', importRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'An internal server error occurred',
    message: err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
