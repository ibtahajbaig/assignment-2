 
const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/', async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;
  res.render('index', { transactions, income, expense, balance });
});

router.post('/add', async (req, res) => {
  const { type, amount, description } = req.body;
  await Transaction.create({ type, amount, description });
  res.redirect('/');
});

router.post('/delete/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
