const express = require('express');
const router = express.Router();
const controller = require('../controllers/publicController');

// Homepage / search
router.get('/', controller.home);

// Recipes listing & filtering stays server-rendered here (keeps same behavior)
router.get('/recipes', controller.listRecipes);

module.exports = router;
