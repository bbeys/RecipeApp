const express = require('express');
const router = express.Router();
const usersModel = require('../models/users');
const recipesModel = require('../models/recipes');

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) return res.redirect('/login');
  next();
}

router.get('/dashboard', requireAuth, (req, res) => {
  const users = usersModel.readAll();
  const user = users.find(u => u.id === req.session.userId);
  const recipes = recipesModel.readAll();
  const saved = (user.favorites || []).map(id => recipes.find(r => r.id === id)).filter(Boolean);
  res.render('dashboard', { saved });
});

router.get('/profile', requireAuth, (req, res) => {
  const user = usersModel.findById(req.session.userId);
  res.render('profile', { user, error: null });
});

router.post('/profile', requireAuth, (req, res) => {
  const { name, email, password, avatar } = req.body || {};
  const updated = {};
  if (name) updated.name = name;
  if (email) updated.email = email;
  if (avatar !== undefined) updated.avatar = avatar;
  if (password) updated.password = password;
  const user = usersModel.updateUser(req.session.userId, updated);
  res.render('profile', { user, error: null, success: 'Profile updated' });
});

// Toggle favorite (requires login)
router.post('/recipes/:id/favorite', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const users = usersModel.readAll();
  const user = users.find(u => u.id === req.session.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.favorites = user.favorites || [];
  const idx = user.favorites.indexOf(id);
  let favorited = false;
  if (idx === -1) { user.favorites.push(id); favorited = true; }
  else { user.favorites.splice(idx, 1); favorited = false; }

  usersModel.writeAll(users);
  res.json({ success: true, favorited });
});

module.exports = router;
