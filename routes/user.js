const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/dashboard', controller.requireAuth, controller.dashboard);
router.get('/profile', controller.requireAuth, controller.getProfile);
router.post('/profile', controller.requireAuth, controller.postProfile);
router.post('/recipes/:id/favorite', controller.requireAuth, controller.toggleFavorite);

module.exports = router;
