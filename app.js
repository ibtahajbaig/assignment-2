require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const indexRoutes = require('./routes/index'); // This handles your routes

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route
app.use('/', indexRoutes); // This connects to routes/index.js

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/budgetapp')
  .then(() => console.log('✅ Connected to local MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
