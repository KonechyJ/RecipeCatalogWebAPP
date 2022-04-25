const express = require("express");
const router = express.Router();
const recipeController = require('../Controllers/recipeController');

/**
 *  App Routes listed below!!
 */
router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);
router.get('/recipe/:id', recipeController.exploreRecipe);

module.exports = router;