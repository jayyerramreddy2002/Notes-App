const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Root endpoint
app.get('/', (req, res) => {
  res.send('XXX');
});

// API Routes - Connect to DB before handling requests
app.use('/api/notes', async (req, res, next) => {
  await connectDB();
  next();
}, require('./routes/noteRoutes'));

// REMOVE app.listen() - Vercel handles this
// Export the app for Vercel
module.exports = app;