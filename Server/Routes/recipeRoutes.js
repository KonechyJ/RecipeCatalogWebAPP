const express = require("express");
const router = express.Router();
const recipeController = require('../Controllers/recipeController')

/**
 *  App Routes listed below!!
 */
router.get('/', recipeController.homepage);

module.exports = router;