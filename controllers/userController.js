const { User, getAllUsers, findUserById } = require('../models/user');
const { getAllRecipes } = require('../models/recipe');

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) return res.redirect('/login');
  next();
}

exports.requireAuth = requireAuth;

exports.dashboard = async (req, res) => {
  const user = new User(req.session.userId);
  await user.getUserDetails(req.session.userRole);
  const recipes = await getAllRecipes();
  const saved = (user && user.favorites ? user.favorites : []).map(id => recipes.find(r => r.id === id)).filter(Boolean);
  res.render('dashboard', { saved });
};

exports.getProfile = async (req, res) => {
  console.log('Session userId:', req.session.userId); // DEBUG
  const user = new User(req.session.userId);
  await user.getUserDetails(req.session.userRole);
  console.log('Found user:', user ? user.name : 'null'); // DEBUG
  res.render('profile', { user, error: null });
};

exports.postProfile = async (req, res) => {
  const { name, email, password, avatar } = req.body || {};
  const user = new User(req.session.userId);
  await user.getUserDetails(req.session.userRole);
  if (!user.name) return res.redirect('/login');
  if (name) user.setName(name);
  if (email) user.setEmail(email);
  if (avatar !== undefined) user.setAvatar(avatar);
  if (password) user.setPassword(password);
  await user.save();
  res.render('profile', { user, error: null, success: 'Profile updated' });
};

exports.toggleFavorite = async (req, res) => {
  const id = Number(req.params.id);
  const user = new User(req.session.userId);
  await user.getUserDetails(req.session.userRole);
  if (!user.name) return res.status(404).json({ error: 'User not found' });

  user.favorites = user.favorites || [];
  const idx = user.favorites.indexOf(id);
  let favorited = false;
  if (idx === -1) { user.favorites.push(id); favorited = true; }
  else { user.favorites.splice(idx, 1); favorited = false; }

  await user.save();
  res.json({ success: true, favorited });
};
