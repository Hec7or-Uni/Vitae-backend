const express = require('express')
const router = express.Router()
// const ctrlUsers = require('../controllers/users') TO DO
const ctrlRecipes = require('../controllers/recipes')
const ctrlAuth = require('../controllers/auth')
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
  .get(ctrlRecipes.getRandomRecipe)

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
