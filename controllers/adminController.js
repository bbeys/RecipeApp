const { Recipe, getAllRecipes, addRecipe, deleteRecipe } = require('../models/recipe');
const { User, getAllUsers, findUserById } = require('../models/user');

async function requireAdmin(req, res, next) {
  if (!req.session || !req.session.userId) return res.redirect('/login');
  const u = new User(req.session.userId);
  await u.getUserDetails(req.session.userRole);
  if (!u.name || !u.isAdmin()) return res.status(403).send('Forbidden');
  next();
}

exports.requireAdmin = requireAdmin;

exports.listRecipes = async (req, res) => {
  const recipes = await getAllRecipes();
  res.render('admin_recipes', { recipes });
};

exports.getAddRecipe = async (req, res) => {
  const allRecipes = await getAllRecipes();
  const uniq = arr => [...new Set(arr)];
  const allMealTypes = uniq(allRecipes.flatMap(r => (Array.isArray(r.mealType) ? r.mealType : [r.mealType]).filter(Boolean))).sort();
  const allCuisines = uniq(allRecipes.flatMap(r => (Array.isArray(r.cuisine) ? r.cuisine : [r.cuisine]).filter(Boolean))).sort();
  const allIngredients = ['broccoli', 'carrots', 'chicken', 'corn', 'eggplant', 'eggs', 'garlic', 'gluten-free bread', 'gluten-free flour', 'lasagna noodles', 'lemon', 'lentils', 'milk', 'olive oil', 'onion', 'rice', 'ricotta cheese', 'salt', 'soy sauce', 'spinach', 'tomato sauce', 'tomatoes', 'zucchini'];
  const allDietary = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'];
  const prepTimeOptions = ['10 min', '20 min', '25 min', '30 min', '35 min', '40 min', '45 min'];
  
  res.render('admin_add', { 
    error: null,
    mealTypes: allMealTypes,
    cuisines: allCuisines,
    dietaryOptions: allDietary,
    allIngredients: allIngredients,
    prepTimeOptions: prepTimeOptions
  });
};

exports.postAddRecipe = async (req, res) => {
  const { title, ingredients, dietary, mealType, cuisine, prepTime, instructions } = req.body || {};
  if (!title) {
    const allRecipes = await getAllRecipes();
    const uniq = arr => [...new Set(arr)];
    const allMealTypes = uniq(allRecipes.flatMap(r => (Array.isArray(r.mealType) ? r.mealType : [r.mealType]).filter(Boolean))).sort();
    const allCuisines = uniq(allRecipes.flatMap(r => (Array.isArray(r.cuisine) ? r.cuisine : [r.cuisine]).filter(Boolean))).sort();
    const allIngredients = ['broccoli', 'carrots', 'chicken', 'corn', 'eggplant', 'eggs', 'garlic', 'gluten-free bread', 'gluten-free flour', 'lasagna noodles', 'lemon', 'lentils', 'milk', 'olive oil', 'onion', 'rice', 'ricotta cheese', 'salt', 'soy sauce', 'spinach', 'tomato sauce', 'tomatoes', 'zucchini'];
    const allDietary = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'];
    const prepTimeOptions = ['10 min', '20 min', '25 min', '30 min', '35 min', '40 min', '45 min'];
    return res.render('admin_add', { 
      error: 'Title is required',
      mealTypes: allMealTypes,
      cuisines: allCuisines,
      dietaryOptions: allDietary,
      allIngredients: allIngredients,
      prepTimeOptions: prepTimeOptions
    });
  }
  
  const result = await addRecipe({
    title,
    ingredients: Array.isArray(ingredients) ? ingredients : (ingredients ? ingredients.split(',').map(s => s.trim()) : []),
    dietary: Array.isArray(dietary) ? dietary : (dietary ? dietary.split(',').map(s => s.trim()) : []),
    mealType: Array.isArray(mealType) ? mealType : (mealType ? [mealType] : []),
    cuisine: Array.isArray(cuisine) ? cuisine : (cuisine ? [cuisine] : []),
    prepTime: prepTime || '',
    instructions: instructions || '',
    adminId: req.session.userId  // Pass the admin ID from session
  });
  
  if (!result) {
    const allRecipes = await getAllRecipes();
    const uniq = arr => [...new Set(arr)];
    const allMealTypes = uniq(allRecipes.flatMap(r => (Array.isArray(r.mealType) ? r.mealType : [r.mealType]).filter(Boolean))).sort();
    const allCuisines = uniq(allRecipes.flatMap(r => (Array.isArray(r.cuisine) ? r.cuisine : [r.cuisine]).filter(Boolean))).sort();
    const allIngredients = ['broccoli', 'carrots', 'chicken', 'corn', 'eggplant', 'eggs', 'garlic', 'gluten-free bread', 'gluten-free flour', 'lasagna noodles', 'lemon', 'lentils', 'milk', 'olive oil', 'onion', 'rice', 'ricotta cheese', 'salt', 'soy sauce', 'spinach', 'tomato sauce', 'tomatoes', 'zucchini'];
    const allDietary = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'];
    const prepTimeOptions = ['10 min', '20 min', '25 min', '30 min', '35 min', '40 min', '45 min'];
    return res.render('admin_add', { 
      error: 'Failed to add recipe. Please try again.',
      mealTypes: allMealTypes,
      cuisines: allCuisines,
      dietaryOptions: allDietary,
      allIngredients: allIngredients,
      prepTimeOptions: prepTimeOptions
    });
  }
  
  console.log('Recipe added successfully:', result);
  res.redirect('/admin/recipes');
};

exports.getEditRecipe = async (req, res) => {
  const recipe = new Recipe(req.params.id);
  await recipe.getRecipeDetails();
  if (!recipe.title) return res.status(404).send('Recipe not found');
  
  // Get all available options for dropdowns
  const allRecipes = await getAllRecipes();
  const uniq = arr => [...new Set(arr)];
  const allMealTypes = uniq(allRecipes.flatMap(r => (Array.isArray(r.mealType) ? r.mealType : [r.mealType]).filter(Boolean))).sort();
  const allCuisines = uniq(allRecipes.flatMap(r => (Array.isArray(r.cuisine) ? r.cuisine : [r.cuisine]).filter(Boolean))).sort();
  const allIngredients = ['broccoli', 'carrots', 'chicken', 'corn', 'eggplant', 'eggs', 'garlic', 'gluten-free bread', 'gluten-free flour', 'lasagna noodles', 'lemon', 'lentils', 'milk', 'olive oil', 'onion', 'rice', 'ricotta cheese', 'salt', 'soy sauce', 'spinach', 'tomato sauce', 'tomatoes', 'zucchini'];
  const allDietary = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'];
  const prepTimeOptions = ['10 min', '20 min', '25 min', '30 min', '35 min', '40 min', '45 min'];
  
  res.render('admin_edit', { 
    recipe, 
    error: null,
    mealTypes: allMealTypes,
    cuisines: allCuisines,
    dietaryOptions: allDietary,
    allIngredients: allIngredients,
    prepTimeOptions: prepTimeOptions
  });
};

exports.postEditRecipe = async (req, res) => {
  const { title, ingredients, dietary, mealType, cuisine, prepTime, instructions } = req.body || {};
  const recipe = new Recipe(req.params.id);
  await recipe.getRecipeDetails();
  if (!recipe.title) return res.status(404).send('Recipe not found');
  
  recipe.setTitle(title);
  recipe.setIngredients(Array.isArray(ingredients) ? ingredients : (ingredients ? ingredients.split(',').map(s => s.trim()) : []));
  // Handle both array (from dropdown) and comma-separated string
  recipe.setDietary(Array.isArray(dietary) ? dietary : (dietary ? dietary.split(',').map(s => s.trim()) : []));
  recipe.setMealType(Array.isArray(mealType) ? mealType : (mealType ? [mealType] : []));
  recipe.setCuisine(Array.isArray(cuisine) ? cuisine : (cuisine ? [cuisine] : []));
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
