const express = require('express')
const router = express.Router()
// const ctrlUsers = require('../controllers/users') TO DO
const ctrlRecipes = require('../controllers/recipes')

// Recipes
router
  .route('/repipe')
  .get(ctrlRecipes.recipeReadOne)
  // .get(ctrlLocations.locationsList)
  .post(ctrlRecipes.recipeCreate)

// Recipes
router
  .route('/test')
  .get(ctrlRecipes.getRandomRecipe)
  // .get(ctrlLocations.locationsList)
  .post(ctrlRecipes.recipeCreate)

module.exports = router
