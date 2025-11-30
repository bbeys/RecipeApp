const { Recipe, getAllRecipes, addRecipe, deleteRecipe } = require('../models/recipe');
const { getAllUsers, findUserById } = require('../models/user');

async function requireAdmin(req, res, next) {
  if (!req.session || !req.session.userId) return res.redirect('/login');
  const u = await findUserById(req.session.userId);
  if (!u || !u.isAdmin()) return res.status(403).send('Forbidden');
  next();
}

exports.requireAdmin = requireAdmin;

exports.listRecipes = async (req, res) => {
  const recipes = await getAllRecipes();
  res.render('admin_recipes', { recipes });
};

exports.getAddRecipe = (req, res) => res.render('admin_add', { error: null });

exports.postAddRecipe = async (req, res) => {
  const { title, ingredients, dietary, mealType, cuisine, prepTime, instructions } = req.body || {};
  if (!title) return res.render('admin_add', { error: 'Title is required' });
  await addRecipe({
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

exports.getEditRecipe = async (req, res) => {
  const recipe = new Recipe(req.params.id);
  await recipe.getRecipeDetails();
  if (!recipe.title) return res.status(404).send('Recipe not found');
  res.render('admin_edit', { recipe, error: null });
};

exports.postEditRecipe = async (req, res) => {
  const { title, ingredients, dietary, mealType, cuisine, prepTime, instructions } = req.body || {};
  const recipe = new Recipe(req.params.id);
  await recipe.getRecipeDetails();
  if (!recipe.title) return res.status(404).send('Recipe not found');
  
  recipe.setTitle(title);
  recipe.setIngredients(ingredients ? ingredients.split(',').map(s => s.trim()) : []);
  recipe.setDietary(dietary ? dietary.split(',').map(s => s.trim()) : []);
  recipe.setMealType(mealType ? mealType.split(',').map(s => s.trim()) : []);
  recipe.setCuisine(cuisine ? cuisine.split(',').map(s => s.trim()) : []);
  recipe.setPrepTime(prepTime || '');
  recipe.setInstructions(instructions || '');
  await recipe.save();
  res.redirect('/admin/recipes');
};

exports.deleteRecipe = async (req, res) => {
  await deleteRecipe(req.params.id);
  res.redirect('/admin/recipes');
};

exports.listUsers = async (req, res) => {
  const users = await getAllUsers();
  res.render('admin_users', { users });
};
