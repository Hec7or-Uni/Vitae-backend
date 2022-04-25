const express = require('express')
const router = express.Router()
// const ctrlUsers = require('../controllers/users') TO DO
const ctrlRecipes = require('../controllers/recipes')

// Recipes
router
  .route('/locations')
  .get(ctrlRecipes.recipeReadOne)
  // .get(ctrlLocations.locationsList)
  .post(ctrlRecipes.recipeCreate)

module.exports = router
