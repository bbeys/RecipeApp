const { findUserByEmail } = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body || {};
  const user = await findUserByEmail(email);
  if (!user || user.password !== password) return res.render('login', { error: 'Invalid credentials' });
  req.session.userId = user.id;
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};
