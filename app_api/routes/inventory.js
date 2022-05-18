const express = require('express')
const router = express.Router()
const ctrlRecipes = require('../controllers/recipes')

router.get('/nutrientInfo', ctrlRecipes.nutrients)

/**
* @openapi
* /:
*   get:
*     description: Return a recipe
*     responses:
*       200:
*       description: Returns a json with 12 recipes
*/
router
  .route('/')
  .get(ctrlRecipes.recipeReadOne)
  .put(ctrlRecipes.recipeModify)
  .post(ctrlRecipes.recipeCreate)

router.get('/discovery', ctrlRecipes.recipeReadAll)

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

module.exports = router
