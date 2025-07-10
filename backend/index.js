// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { PORT, mongoDBURL } from './config.js';
import bookroute from './routes/bookroutes.js';

const app = express();

// 1) Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://bookapp-8k1h.onrender.com'],
  credentials: true
}));

// 2) Logging (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, 'Body:', req.body);
  next();
});

// 3) Routes
app.get('/', (req, res) => res.send('Welcome'));
app.use('/books', bookroute);

// 4) DB + Server start
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 App listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
