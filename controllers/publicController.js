const { getAllRecipes } = require('../models/recipe');

function uniq(arr = []) {
  return Array.from(new Set(arr.filter(Boolean)));
}

function normalize(s) {
  return String(s || '').toLowerCase();
}

function asArray(v) {
  return Array.isArray(v) ? v : (typeof v === 'undefined' ? [] : [v]);
}

exports.home = async (req, res) => {
  const recipes = await getAllRecipes();
  const allIngredients = uniq(recipes.flatMap(r => r.ingredients || [])).sort((a,b) => a.localeCompare(b));
  const allDietary = uniq(recipes.flatMap(r => (Array.isArray(r.dietary) ? r.dietary : [r.dietary]).filter(Boolean))).sort((a,b) => a.localeCompare(b));
  const allMealTypes = uniq(recipes.flatMap(r => (Array.isArray(r.mealType) ? r.mealType : [r.mealType]).filter(Boolean))).sort((a,b) => a.localeCompare(b));
  const allCuisines = uniq(recipes.flatMap(r => (Array.isArray(r.cuisine) ? r.cuisine : [r.cuisine]).filter(Boolean))).sort((a,b) => a.localeCompare(b));
  const allPrepTimes = uniq(recipes.map(r => r.prepTime)).sort((a,b) => String(a).localeCompare(String(b)));

  const suggested = recipes.length ? recipes[Math.floor(Math.random() * recipes.length)] : null;

  res.render('search', {
    ingredients: allIngredients,
    dietary: allDietary,
    mealTypes: allMealTypes,
    cuisines: allCuisines,
    prepTimes: allPrepTimes,
    suggested,
  });
};

exports.listRecipes = async (req, res) => {
  const recipes = await getAllRecipes();
  let filtered = recipes;
  const { dietary, mealType, cuisine, prepTime, ingredients } = req.query;

  if (ingredients) {
    const ingredientsArray = asArray(ingredients).map(normalize);
    filtered = filtered.filter(recipe => (Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients]).map(normalize).some(i => ingredientsArray.includes(i)));
  }

  if (dietary) {
    const dietaryArray = asArray(dietary).map(normalize);
    filtered = filtered.filter(recipe => (Array.isArray(recipe.dietary) ? recipe.dietary : [recipe.dietary]).map(normalize).every(d => dietaryArray.includes(d)));
  }

  if (mealType) {
    const mealTypeArray = asArray(mealType).map(normalize);
    filtered = filtered.filter(recipe => (Array.isArray(recipe.mealType) ? recipe.mealType : [recipe.mealType]).map(normalize).some(t => mealTypeArray.includes(t)));
  }

  if (cuisine) {
    const cuisineArray = asArray(cuisine).map(normalize);
    filtered = filtered.filter(recipe => (Array.isArray(recipe.cuisine) ? recipe.cuisine : [recipe.cuisine]).map(normalize).some(c => cuisineArray.includes(c)));
  }

  if (prepTime) {
    filtered = filtered.filter(recipe => String(recipe.prepTime) === String(prepTime));
  }

  res.render('recipes', { recipes: filtered, query: req.query, path: req.originalUrl });
};
