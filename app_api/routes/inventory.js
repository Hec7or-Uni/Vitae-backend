const express = require('express')
const router = express.Router()
const ctrlRecipes = require('../controllers/recipes')

router.get('/nutrient-info', ctrlRecipes.nutrients)

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
*   post:
*     description: Function not implemented
*     responses:
*       407:
*       description: Nothing implemented
*   delete:
*     description: Function not implemented
*     responses:
*       407:
*       description: Nothing implemented
*   put:
*     description: Function not implemented
*     responses:
*       407:
*       description: Nothing implemented
*/
router
  .route('/random-recipes')
  .get(ctrlRecipes.getRandomRecipe)
  .post(ctrlRecipes.notImplemented)
  .delete(ctrlRecipes.notImplemented)
  .put(ctrlRecipes.notImplemented)

/**
* @openapi
* /quote:
*   get:
*     description: Give a joke or quote about food
*     responses:
*       200:
*       description: Returns a text
*   post:
*     description: Function not implemented
*     responses:
*       407:
*       description: Nothing implemented
*   delete:
*     description: Function not implemented
*     responses:
*       407:
*       description: Nothing implemented
*   put:
*     description: Function not implemented
*     responses:
*       407:
*       description: Nothing implemented
*/
router
  .route('/quote')
  .get(ctrlRecipes.randomQuote)
  .post(ctrlRecipes.notImplemented)
  .delete(ctrlRecipes.notImplemented)
  .put(ctrlRecipes.notImplemented)

module.exports = router
