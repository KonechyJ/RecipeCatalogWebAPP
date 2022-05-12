const express = require("express");
const router = express.Router();
const recipeController = require('../Controllers/recipeController');

/**
 *  App Routes listed below!!
 */
router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);
router.get('/recipe/:id', recipeController.exploreRecipe);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.get('/see-newest', recipeController.seeNewest);
router.get('/see-random', recipeController.seeRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.get('/update-recipe', recipeController.updateRecipe);
// router.get('/delete-recipe', recipeController.deleteRecipe);

router.post('/search', recipeController.searchRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);
router.post('/delete-recipe', recipeController.deleteRecipe);

module.exports = router;