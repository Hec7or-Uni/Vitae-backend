const express = require('express')
const router = express.Router()
// const ctrlUsers = require('../controllers/users') TO DO
const ctrlRecipes = require('../controllers/recipes')

router
  .route('/recipes')
  .get(ctrlRecipes.recipeReadOne)
  .put(ctrlRecipes.recipeModify)
  .post(ctrlRecipes.recipeCreate)

router
  .route('/recipes')
  .get('/discovery', ctrlRecipes.recipeReadAll)

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
  .route('/RandomRecipes')
  .get(ctrlRecipes.getRandomRecipe)
  .post(ctrlRecipes.notDefinedFunct)
  .delete(ctrlRecipes.notDefinedFunct)
  .put(ctrlRecipes.notDefinedFunct)

/* GET quote about food */
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
  .post(ctrlRecipes.notDefinedFunct)
  .delete(ctrlRecipes.notDefinedFunct)
  .put(ctrlRecipes.notDefinedFunct)

module.exports = router
