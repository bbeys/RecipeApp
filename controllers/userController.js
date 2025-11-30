const usersModel = require('../models/users');
const recipesModel = require('../models/recipes');

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) return res.redirect('/login');
  next();
}

exports.requireAuth = requireAuth;

exports.dashboard = (req, res) => {
  const user = usersModel.findById(req.session.userId);
  const recipes = recipesModel.readAll();
  const saved = (user && user.favorites ? user.favorites : []).map(id => recipes.find(r => r.id === id)).filter(Boolean);
  res.render('dashboard', { saved });
};

exports.getProfile = (req, res) => {
  const user = usersModel.findById(req.session.userId);
  res.render('profile', { user, error: null });
};

exports.postProfile = (req, res) => {
  const { name, email, password, avatar } = req.body || {};
  const payload = {};
  if (name) payload.name = name;
  if (email) payload.email = email;
  if (avatar !== undefined) payload.avatar = avatar;
  if (password) payload.password = password;
  const user = usersModel.updateUser(req.session.userId, payload);
  res.render('profile', { user, error: null, success: 'Profile updated' });
};

exports.toggleFavorite = (req, res) => {
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
};
