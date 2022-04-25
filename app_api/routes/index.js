const express = require('express')
const router = express.Router()
// const ctrlUsers = require('../controllers/users') TO DO
const ctrlRecipes = require('../controllers/recipes')
// Recipes
router
  .route('/recipes')
  .get(ctrlRecipes.recipeReadOne)
  .put(ctrlRecipes.recipeModify)
  .post(ctrlRecipes.recipeCreate)
router.get('recipes/discovery', ctrlRecipes.recipeReadAll)

// User interactions
router
  .route('/user')
  .get()

// Recipes
router
  .route('/test')
  .get(ctrlRecipes.getRandomRecipe)
  // .get(ctrlLocations.locationsList)
  .post(ctrlRecipes.recipeCreate)

module.exports = router