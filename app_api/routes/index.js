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

// Random Recipes
/**
* @openapi
* /RandomRecipes:
*   get:
*     description: Return random recipes
*     responses:
*       200:
*       description: Returns a json with 12 recipes
*/
router
  .route('/RandomRecipes')
  .get(ctrlRecipes.searchRecipe)

/* GET quote about food */
/**
* @openapi
* /quote:
*   get:
*     description: Give a joke or quote about food
*     responses:
*       200:
*       description: Returns a text
*/
router
  .route('/quote')
  .get(ctrlRecipes.randomQuote)

// test
router
  .route('/test')
  .get(ctrlRecipes.searchRecipe)

module.exports = router
