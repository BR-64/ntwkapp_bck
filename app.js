// src/app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const peopleRoutes = require('./routes/peopleRoutes');
const { authenticate } = require('./middleware/auth');

const app = express();

// ── Security & Middleware ─────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
      : process.env.NODE_ENV === 'production'
      ? false
      : '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── Rate Limiting ─────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// ── Health Check ──────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date() });
});

// ── Routes ────────────────────────────────────────────────────────
app.use('/api/v1/users', authenticate, userRoutes);
app.use('/api/people', peopleRoutes);

// ── Error Handling ────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
