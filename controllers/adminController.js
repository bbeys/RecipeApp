const recipesModel = require('../models/recipes');
const usersModel = require('../models/users');

function requireAdmin(req, res, next) {
  if (!req.session || !req.session.userId) return res.redirect('/login');
  const u = usersModel.findById(req.session.userId);
  if (!u || u.role !== 'admin') return res.status(403).send('Forbidden');
  next();
}

exports.requireAdmin = requireAdmin;

exports.listRecipes = (req, res) => {
  const recipes = recipesModel.readAll();
  res.render('admin_recipes', { recipes });
};

exports.getAddRecipe = (req, res) => res.render('admin_add', { error: null });

exports.postAddRecipe = (req, res) => {
  const { title, ingredients, dietary, mealType, cuisine, prepTime, instructions } = req.body || {};
  if (!title) return res.render('admin_add', { error: 'Title is required' });
  recipesModel.addRecipe({
    title,
    ingredients: ingredients ? ingredients.split(',').map(s => s.trim()) : [],
    dietary: dietary ? dietary.split(',').map(s => s.trim()) : [],
    mealType: mealType ? mealType.split(',').map(s => s.trim()) : [],
    cuisine: cuisine ? cuisine.split(',').map(s => s.trim()) : [],
    prepTime: prepTime || '',
    instructions: instructions || ''
  });
  res.redirect('/admin/recipes');
};

exports.getEditRecipe = (req, res) => {
  const recipe = recipesModel.findById(req.params.id);
  if (!recipe) return res.status(404).send('Recipe not found');
  res.render('admin_edit', { recipe, error: null });
};

exports.postEditRecipe = (req, res) => {
  const { title, ingredients, dietary, mealType, cuisine, prepTime, instructions } = req.body || {};
  const updated = {
    title,
    ingredients: ingredients ? ingredients.split(',').map(s => s.trim()) : [],
    dietary: dietary ? dietary.split(',').map(s => s.trim()) : [],
    mealType: mealType ? mealType.split(',').map(s => s.trim()) : [],
    cuisine: cuisine ? cuisine.split(',').map(s => s.trim()) : [],
    prepTime: prepTime || '',
    instructions: instructions || ''
  };
  recipesModel.updateRecipe(req.params.id, updated);
  res.redirect('/admin/recipes');
};

exports.deleteRecipe = (req, res) => {
  recipesModel.deleteRecipe(req.params.id);
  res.redirect('/admin/recipes');
};

exports.listUsers = (req, res) => {
  const users = usersModel.readAll();
  res.render('admin_users', { users });
};
