const express = require('express');
const router = express.Router();
const usersModel = require('../models/users');

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  const user = usersModel.findByEmail(email);
  if (!user || user.password !== password) return res.render('login', { error: 'Invalid credentials' });
  req.session.userId = user.id;
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
