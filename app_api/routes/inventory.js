const express = require('express')
const router = express.Router()
const ctrlRecipes = require('../controllers/recipes')
const ctrlInventory = require('../controllers/inventory')
const http = require('../../lib/http')
const { authenticate } = require('../../lib/auth')

/**
* @openapi
* /api/inventory:
*   get:
*     description: Return a recipe
*     parameters:
*     - name: id
*       description: id of the recipe
*       required: true
*       type: Number
*     responses:
*       200:
*       description: Returns a json with the recipe
*   post:
*     description: Post a recipe
*     responses:
*       204:
*       description: Recipe posted
*   delete:
*     description: Delete a recipe
*     parameters:
*     - name: id
*       description: id of the recipe
*       required: true
*       type: Number
*     responses:
*       404:
*       description: Error print
*   put:
*     description: Modify a recipe
*     responses:
*       204:
*       description: Recipe modified
*/
router
  .route('/', authenticate)
  .get(ctrlRecipes.recipeReadOne)
  .put(ctrlRecipes.recipeModify)
  .post(ctrlRecipes.recipeCreate)
  .delete(http.notImplemented)

/**
* @openapi
* /api/inventory/discovery:
*   get:
*     description: Return  recipes for the page discover in database
*     responses:
*       200:
*       description: Returns a json with N recipes
*/
router
  .route('/discovery', authenticate)
  .get(ctrlRecipes.recipeReadAll)
  .post(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)

/**
* @openapi
* /api/inventory/random-recipes:
*   get:
*     description: Return random recipes
*     responses:
*       200:
*       description: Returns a json with N recipes
*/
router
  .route('/random-recipes', authenticate)
  .get(ctrlRecipes.getRandomRecipe)
  .post(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)

/**
  * @openapi
  * /api/inventory/search-recipes
  *   post:
  *     description: Search recipes with a query
  *     responses:
  *       200:
  *       description: menu saved
  */
router
  .route('/search-recipes', authenticate)
  .get(ctrlRecipes.searchRecipe)
  .post(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)

/**
  * @openapi
  * /api/inventory/save-menu:
  *   post:
  *     description: Save a menu
  *     responses:
  *       204:
  *       description: menu saved
  */
router
  .route('/save-menu', authenticate)
  .post(ctrlInventory.saveMenu)
  .get(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)
  // .delete('/delete-menu', ctrlInventory.deleteMenu)

/**
* @openapi
* /api/inventory/save-recipe:
*   post:
*     description: Save a recipe
*     responses:
*       204:
*       description: Recipe saved to storage
*/
router
  .route('/save-recipe', authenticate)
  .post(ctrlInventory.saveRecipe)
  .get(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)
  // .delete('/delete-recipe', ctrlInventory.deleteRecipe)

module.exports = router
