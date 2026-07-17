const express = require('express');
const cors = require('cors');

const { authMiddleware } = require('./auth');
const healthRoutes = require('./routes/health');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use('/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

module.exports = { app };
