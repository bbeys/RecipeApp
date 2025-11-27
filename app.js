const express = require('express');
const fs = require('fs');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// parse form bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session (simple prototype use — in production use a secure store)
app.use(
  session({ secret: 'recipe-app-secret-please-change', resave: false, saveUninitialized: false })
);

// helper helpers to read/write users
const usersFile = path.join(__dirname, 'data', 'users.json');
function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  } catch (e) {
    return [];
  }
}
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
}

// attach user to res.locals for templates
app.use((req, res, next) => {
  res.locals.user = null;
  if (req.session && req.session.userId) {
    const users = readUsers();
    const u = users.find(x => x.id === req.session.userId);
    if (u) res.locals.user = u;
  }
  next();
});

// simple guards
function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) return res.redirect('/login');
  next();
}
function requireAdmin(req, res, next) {
  if (!req.session || !req.session.userId) return res.redirect('/login');
  const users = readUsers();
  const u = users.find(x => x.id === req.session.userId);
  if (!u || u.role !== 'admin') return res.status(403).send('Forbidden');
  next();
}

// Homepage
app.get('/', (req, res) => {
  // Render a search page with available filter values pulled from recipes.json
  const filePath = path.join(__dirname, 'data', 'recipes.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Failed to load recipes');

    let recipes;
    try {
      recipes = JSON.parse(data);
    } catch (parseErr) {
      console.error('Failed to parse recipes.json:', parseErr);
      return res.status(500).send('Failed to parse recipes');
    }

    // Collect unique values to populate filter controls
    const uniq = (arr = []) => Array.from(new Set(arr.filter(Boolean)));

    const allIngredients = uniq(recipes.flatMap(r => r.ingredients || [])).sort((a, b) => a.localeCompare(b));
    const allDietary = uniq(recipes.flatMap(r => (Array.isArray(r.dietary) ? r.dietary : [r.dietary]).filter(Boolean))).sort((a,b) => a.localeCompare(b));
    const allMealTypes = uniq(recipes.flatMap(r => (Array.isArray(r.mealType) ? r.mealType : [r.mealType]).filter(Boolean))).sort((a,b) => a.localeCompare(b));
    const allCuisines = uniq(recipes.flatMap(r => (Array.isArray(r.cuisine) ? r.cuisine : [r.cuisine]).filter(Boolean))).sort((a,b) => a.localeCompare(b));
    const allPrepTimes = uniq(recipes.map(r => r.prepTime)).sort((a,b) => a.localeCompare(b));

    // pick a suggested recipe (simple random choice) for the homepage
    const suggested = recipes.length ? recipes[Math.floor(Math.random() * recipes.length)] : null;

    // if admin, calculate totals to show on the homepage
    let adminTotals = null;
    try {
      const users = readUsers();
      adminTotals = { totalUsers: users.length, totalRecipes: recipes.length };
    } catch (e) {
      // ignore
    }

    res.render('search', {
      ingredients: allIngredients,
      dietary: allDietary,
      mealTypes: allMealTypes,
      cuisines: allCuisines,
      prepTimes: allPrepTimes,
      suggested,
      adminTotals,
    });
  });
});

// Authentication routes
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.render('login', { error: 'Invalid credentials' });
  req.session.userId = user.id;
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

// Admin routes — add recipe
app.get('/admin/add-recipe', requireAdmin, (req, res) => {
  res.render('admin_add', { error: null });
});

app.post('/admin/add-recipe', requireAdmin, (req, res) => {
  const filePath = path.join(__dirname, 'data', 'recipes.json');
  let recipes = [];
  try {
    recipes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {}

  const { title, ingredients, dietary, mealType, cuisine, prepTime, instructions } = req.body;
  if (!title) return res.render('admin_add', { error: 'Title is required' });

  const nextId = recipes.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1;
  const newRecipe = {
    id: nextId,
    title: title,
    ingredients: ingredients ? ingredients.split(',').map(s => s.trim()) : [],
    dietary: dietary ? dietary.split(',').map(s => s.trim()) : [],
    mealType: mealType ? mealType.split(',').map(s => s.trim()) : [],
    cuisine: cuisine ? cuisine.split(',').map(s => s.trim()) : [],
    prepTime: prepTime || '',
    instructions: instructions || ''
  };

  recipes.push(newRecipe);
  fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), 'utf8');
  res.redirect(`/recipes`);
});

// Route to show recipes
app.get('/recipes', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'recipes.json');

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Failed to load recipes');
    }

    let recipes;
    try {
      recipes = JSON.parse(data);
    } catch (parseErr) {
      console.error('Failed to parse recipes.json:', parseErr);
      return res.status(500).send('Failed to parse recipes');
    }
    const { dietary, mealType, cuisine, prepTime, ingredients } = req.query;

    // Helpers for exact, case-insensitive matching
    const asArray = v => (Array.isArray(v) ? v : typeof v === 'undefined' ? [] : [v]);
    const normalize = s => String(s).toLowerCase();
    const sameSet = (a, b) => {
      if (!Array.isArray(a) || !Array.isArray(b)) return false;
      const sa = new Set(a.map(normalize));
      const sb = new Set(b.map(normalize));
      if (sa.size !== sb.size) return false;
      for (const x of sa) if (!sb.has(x)) return false;
      return true;
    };

    // Filtering logic
    // Ingredients: require each selected ingredient to be present in the recipe's ingredients (case-insensitive)
    if (ingredients) {
      const ingredientsArray = asArray(ingredients).map(normalize);
      recipes = recipes.filter(recipe => {
        const rIngredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients];
        const lower = rIngredients.map(normalize);
        return ingredientsArray.every(i => lower.includes(i));
      });
    }

    // Dietary: ensure selected dietary flags are included in recipe dietary options (case-insensitive)
    if (dietary) {
      const dietaryArray = asArray(dietary).map(normalize);
      recipes = recipes.filter(recipe => {
        const rDiet = Array.isArray(recipe.dietary) ? recipe.dietary : [recipe.dietary];
        const lower = rDiet.map(normalize);
        return dietaryArray.every(d => lower.includes(d));
      });
    }

    if (mealType) {
      // Include-match: a recipe matches when it contains any of the selected meal type(s) (case-insensitive)
      const mealTypeArray = asArray(mealType).map(normalize);
      recipes = recipes.filter(recipe => {
        const rTypes = Array.isArray(recipe.mealType) ? recipe.mealType : [recipe.mealType];
        return rTypes.map(normalize).some(t => mealTypeArray.includes(t));
      });
    }

    if (cuisine) {
      // Include-match: a recipe matches when it contains any of the selected cuisine(s) (case-insensitive)
      const cuisineArray = asArray(cuisine).map(normalize);
      recipes = recipes.filter(recipe => {
        const rCuisines = Array.isArray(recipe.cuisine) ? recipe.cuisine : [recipe.cuisine];
        return rCuisines.map(normalize).some(c => cuisineArray.includes(c));
      });
    }

    if (prepTime) {
      // prepTime in queries is a string — compare consistently
      recipes = recipes.filter(recipe => String(recipe.prepTime) === String(prepTime));
    }

    // Render the filtered recipes and also pass current query / path so the view can show a shareable URL
    res.render('recipes', { recipes, query: req.query, path: req.originalUrl });
  });
});

// Toggle favorite (requires login)
app.post('/recipes/:id/favorite', requireAuth, (req, res) => {
  const recipeId = Number(req.params.id);
  const users = readUsers();
  const user = users.find(u => u.id === req.session.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.favorites = user.favorites || [];
  const idx = user.favorites.indexOf(recipeId);
  let favorited = false;
  if (idx === -1) { user.favorites.push(recipeId); favorited = true; }
  else { user.favorites.splice(idx, 1); favorited = false; }

  writeUsers(users);
  res.json({ success: true, favorited });
});

// User dashboard (saved recipes)
app.get('/dashboard', requireAuth, (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.session.userId);
  const recipes = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'recipes.json'), 'utf8'));
  const saved = (user.favorites || []).map(id => recipes.find(r => r.id === id)).filter(Boolean);
  // If admin, the dashboard will render admin controls (template checks user role)
  res.render('dashboard', { saved });
});

// Admin: list all recipes
app.get('/admin/recipes', requireAdmin, (req, res) => {
  const recipes = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'recipes.json'), 'utf8'));
  res.render('admin_recipes', { recipes });
});

// Admin: edit a recipe
app.get('/admin/recipes/:id/edit', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const filePath = path.join(__dirname, 'data', 'recipes.json');
  let recipes = [];
  try {
    recipes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {}

  const recipe = recipes.find(r => Number(r.id) === id);
  if (!recipe) return res.status(404).send('Recipe not found');
  res.render('admin_edit', { recipe, error: null });
});

app.post('/admin/recipes/:id/edit', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const filePath = path.join(__dirname, 'data', 'recipes.json');
  let recipes = [];
  try {
    recipes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {}

  const idx = recipes.findIndex(r => Number(r.id) === id);
  if (idx === -1) return res.status(404).send('Recipe not found');

  const { title, ingredients, dietary, mealType, cuisine, prepTime, instructions } = req.body;
  if (!title) return res.render('admin_edit', { recipe: recipes[idx], error: 'Title is required' });

  recipes[idx] = {
    ...recipes[idx],
    title,
    ingredients: ingredients ? ingredients.split(',').map(s => s.trim()) : [],
    dietary: dietary ? dietary.split(',').map(s => s.trim()) : [],
    mealType: mealType ? mealType.split(',').map(s => s.trim()) : [],
    cuisine: cuisine ? cuisine.split(',').map(s => s.trim()) : [],
    prepTime: prepTime || '',
    instructions: instructions || ''
  };

  fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), 'utf8');
  res.redirect('/admin/recipes');
});

// Admin: delete a recipe
app.post('/admin/recipes/:id/delete', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const filePath = path.join(__dirname, 'data', 'recipes.json');
  let recipes = [];
  try {
    recipes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {}

  const idx = recipes.findIndex(r => Number(r.id) === id);
  if (idx === -1) return res.status(404).send('Recipe not found');

  recipes.splice(idx, 1);
  fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), 'utf8');
  res.redirect('/admin/recipes');
});

// Admin: list users (user management)
app.get('/admin/users', requireAdmin, (req, res) => {
  const users = readUsers();
  res.render('admin_users', { users });
});

// Profile — view and edit
app.get('/profile', requireAuth, (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.session.userId);
  res.render('profile', { user, error: null });
});

app.post('/profile', requireAuth, (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.session.userId);
  if (!user) return res.redirect('/login');

  const { name, email, password, avatar } = req.body || {};
  if (name) user.name = name;
  if (email) user.email = email;
  if (avatar !== undefined) user.avatar = avatar;
  if (password) user.password = password; // note: plain text — for prototype only

  writeUsers(users);
  res.render('profile', { user, error: null, success: 'Profile updated' });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
