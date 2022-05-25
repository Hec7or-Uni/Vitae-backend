const express = require('express')
const router = express.Router()
const ctrlRecipes = require('../controllers/recipes')
const ctrlInventory = require('../controllers/inventory')
const http = require('../../lib/http')
const { authenticate } = require('../../lib/auth')

/**
* @openapi
*  tags:
*    name: Backend
*    description: Backend API
*/

/**
* @openapi
*  tags:
*    name: Frontend
*    description: Frontend API
*/

/**
* @openapi
*  /inventory
*    get:
*      tags:
*       - Inventory
*       - Backend
*      description: Return a recipe
*      parameters:
*        name: id
*        description: id of the recipe
*        required: true
*        type: Number
*      responses:
*        200:
*        description: Returns a json with the recipe
*    post:
*      tags:
*       - Inventory
*       - Backend
*      description: Post a recipe
*      responses:
*        204:
*        description: Recipe posted
*    put:
*      tags:
*       - Inventory
*       - Backend
*      description: Modify a recipe
*      responses:
*        204:
*        description: Recipe modified
*    delete:
*      tags:
*       - Inventory
*       - Backend
*      description: Delete a recipe
*      parameters:
*        name: id
*        description: id of the recipe
*        required: true
*        type: Number
*      responses:
*        404:
*        description: Error print
*/
router
  .use(authenticate)
  .route('/')
  .get(ctrlRecipes.recipeReadOne)
  .post(ctrlRecipes.recipeCreate)
  .put(ctrlRecipes.recipeModify)
  .delete(http.notImplemented)

/**
* @openapi
* /inventory/discovery
*   get:
*     tags:
*      - Inventory
*      - Backend
*     description: Return  recipes for the page discover in database
*     responses:
*       200:
*       description: Returns a json with N recipes
*/
router
  .use(authenticate)
  .route('/discovery', authenticate)
  .get(ctrlRecipes.recipeReadAll)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(http.notImplemented)

/**
* @openapi
* /inventory/random-recipes
*   get:
*     tags:
*      - Inventory
*      - Backend
*     description: Return random recipes
*     responses:
*       200:
*       description: Returns a json with N recipes
*/
router
  .use(authenticate)
  .route('/random-recipes', authenticate)
  .get(ctrlRecipes.getRandomRecipe)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(http.notImplemented)

/**
  * @openapi
  * /inventory/search-recipes
  *   post:
  *     tags:
  *      - Inventory
  *      - Backend
  *     description: Search recipes with a query
  *     responses:
  *       200:
  *       description: menu saved
  */
router
  .use(authenticate)
  .route('/search-recipes')
  .get(ctrlRecipes.searchRecipe)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(http.notImplemented)

/**
  * @openapi
  * /inventory/menu
  *   post:
  *     tags:
  *      - Inventory
  *      - Backend
  *     description: Save a menu
  *     responses:
  *       204:
  *       description: menu saved
  */
router
  .use(authenticate)
  .route('/menu', authenticate)
  .get(ctrlInventory.getMenu)
  .post(ctrlInventory.saveMenu)
  .put(http.notImplemented)
  .delete(ctrlInventory.deleteMenu)

router.get('/menu/all', ctrlInventory.getAllMenus)
/**
* @openapi
* /inventory/save-recipe
*   post:
*     tags:
*      - Inventory
*      - Backend
*     description: Save a recipe
*     responses:
*       204:
*       description: Recipe saved to storage
*/
router
  .use(authenticate)
  .route('/save-recipe', authenticate) // esto no funciona
  .get(http.notImplemented)
  .post(ctrlInventory.saveRecipe)
  .put(http.notImplemented)
  .delete(http.notImplemented)
  // .delete('/delete-recipe', ctrlInventory.deleteRecipe)

module.exports = router
