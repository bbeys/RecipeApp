const express = require('express');
const router = express.Router();
const recipesModel = require('../models/recipes');

// Homepage / search
router.get('/', (req, res) => {
  const recipes = recipesModel.readAll();
  const uniq = (arr = []) => Array.from(new Set(arr.filter(Boolean)));
  const allIngredients = uniq(recipes.flatMap(r => r.ingredients || [])).sort((a, b) => a.localeCompare(b));
  const allDietary = uniq(recipes.flatMap(r => (Array.isArray(r.dietary) ? r.dietary : [r.dietary]).filter(Boolean))).sort((a,b) => a.localeCompare(b));
  const allMealTypes = uniq(recipes.flatMap(r => (Array.isArray(r.mealType) ? r.mealType : [r.mealType]).filter(Boolean))).sort((a,b) => a.localeCompare(b));
  const allCuisines = uniq(recipes.flatMap(r => (Array.isArray(r.cuisine) ? r.cuisine : [r.cuisine]).filter(Boolean))).sort((a,b) => a.localeCompare(b));
  const allPrepTimes = uniq(recipes.map(r => r.prepTime)).sort((a,b) => a.localeCompare(b));

  const suggested = recipes.length ? recipes[Math.floor(Math.random() * recipes.length)] : null;

  // admin totals are computed by app middleware if user is admin (handled in app.js)
  res.render('search', {
    ingredients: allIngredients,
    dietary: allDietary,
    mealTypes: allMealTypes,
    cuisines: allCuisines,
    prepTimes: allPrepTimes,
    suggested,
  });
});

// Recipes listing & filtering stays server-rendered here (keeps same behavior)
router.get('/recipes', (req, res) => {
  const recipes = recipesModel.readAll();
  let filtered = recipes;
  const { dietary, mealType, cuisine, prepTime, ingredients } = req.query;

  const asArray = v => (Array.isArray(v) ? v : typeof v === 'undefined' ? [] : [v]);
  const normalize = s => String(s).toLowerCase();

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
});

module.exports = router;
