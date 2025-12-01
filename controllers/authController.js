const { findUserByEmail } = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body || {};
  console.log('Login attempt - Email:', email);
  const user = await findUserByEmail(email);
  console.log('Found user:', user ? `ID: ${user.id}, Name: ${user.name}, Role: ${user.role}` : 'null');
  if (!user || user.password !== password) return res.render('login', { error: 'Invalid credentials' });
  req.session.userId = user.id;
  req.session.userRole = user.role;
  console.log('Session userId set to:', user.id, 'Role:', user.role);
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};
