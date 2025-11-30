const express = require('express');
const path = require('path');
const session = require('express-session');
const usersModel = require('./models/users');

const app = express();
const PORT = 3000;

// Pug view engine & views folder
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

// static + body parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session (prototype-safe — do NOT use in production as-is)
app.use(session({ secret: 'recipe-app-secret-please-change', resave: false, saveUninitialized: false }));

// Attach user to res.locals so templates can inspect logged-in user easily
app.use((req, res, next) => {
  res.locals.user = null;
  if (req.session && req.session.userId) {
    const u = usersModel.findById(req.session.userId);
    if (u) res.locals.user = u;

    // if admin, add basic totals for dashboard header
    if (u && u.role === 'admin') {
      const recipesModel = require('./models/recipes');
      const allRecipes = recipesModel.readAll();
      const allUsers = usersModel.readAll();
      res.locals.adminTotals = { totalUsers: allUsers.length, totalRecipes: allRecipes.length };
    }
  }
  next();
});

// Route modules (all route logic lives inside these files now)
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/public'));
app.use('/', require('./routes/user'));
app.use('/', require('./routes/admin'));

// 404 handler
app.use((req, res) => res.status(404).send('Not Found'));

// Start
app.listen(PORT, '0.0.0.0', () => console.log(`Server is running at http://localhost:${PORT}`));
