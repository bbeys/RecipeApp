const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');

router.get('/admin/recipes', controller.requireAdmin, controller.listRecipes);
router.get('/admin/add-recipe', controller.requireAdmin, controller.getAddRecipe);
router.post('/admin/add-recipe', controller.requireAdmin, controller.postAddRecipe);
router.get('/admin/recipes/:id/edit', controller.requireAdmin, controller.getEditRecipe);
router.post('/admin/recipes/:id/edit', controller.requireAdmin, controller.postEditRecipe);
router.post('/admin/recipes/:id/delete', controller.requireAdmin, controller.deleteRecipe);
router.get('/admin/users', controller.requireAdmin, controller.listUsers);

module.exports = router;
