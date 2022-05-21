const express = require('express')
const router = express.Router()
const ctrlRecipes = require('../controllers/recipes')
const ctrlInventory = require('../controllers/inventory')
const http = require('../../lib/http')

router.get('/nutrientInfo', ctrlRecipes.nutrients)
/**
* @swagger
* /recipes:
*   get:
*     description: Return a recipe
*     parameters:
*     - name: id
*       description: id of the recipe
*       in: formData
*       required: true
*       type: Number
*     responses:
*       200:
*       description: Returns a json with the recipe
*   post:
*     description: Post a recipe
*     responses:
*       407:
*       description: Post a recipe
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
  .post(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)

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
  .post(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)

router
  .post('/save-menu', ctrlInventory.saveMenu)
  // .delete('/delete-menu', ctrlInventory.deleteMenu)

router
  .post('/save-recipe', ctrlInventory.saveRecipe)
  // .delete('/delete-recipe', ctrlInventory.deleteRecipe)

module.exports = router
