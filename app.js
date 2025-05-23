const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const indexRoutes = require('./routes/index');

mongoose.connect("mongodb://localhost:27017/budgetDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected");
  app.listen(3000, () => console.log("Server is running on http://localhost:3000"));
})
.catch(err => {
  console.error("MongoDB connection error:", err);
});
