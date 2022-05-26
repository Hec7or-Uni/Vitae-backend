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
* /inventory:
*   get:
*     tags:
*     - Inventory
*     - Backend
*     description: Return a recipe
*     parameters:
*       name: id
*       description: id of the recipe
*       required: true
*       type: Number
*     security:
*       OAuth2: [admin]
*     responses:
*       200:
*       description: Returns a json with the recipe
*   post:
*     tags:
*       - Inventory
*       - Backend
*     description: Post a recipe
*     parameters:
*     - in: "body"
*       name: recipe
*       description: json of a recipe
*       required: true
*       type: Object
*     responses:
*       204:
*       description: Recipe posted
*     security:
*       OAuth2: [admin]
*   delete:
*     consumes:
*     tags:
*      - Inventory
*      - Backend
*     description: Delete a recipe
*     parameters:
*       name: id
*       description: id of the recipe
*       required: true
*       type: Number
*     security:
*       OAuth2: [admin]
*     responses:
*       404:
*       description: Error print
*   put:
*     tags:
*      - Inventory
*      - Backend
*     description: Modify a recipe
*     parameters:
*     - in: "body"
*       name: Recipe
*       description: json of a recipe
*       required: true
*       type: Object
*     security:
*       OAuth2: [admin]
*     responses:
*       204:
*       description: Recipe modified
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
* /inventory/discovery:
*   get:
*     parameters:
*       name: quantity
*       description: Number of recipes
*       required: true
*       type: Number
*     tags:
*      - Inventory
*      - Backend
*     description: Return  recipes for the page discover in database
*     security:
*       OAuth2: [user]
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
* /inventory/random-recipes:
*   get:
*     tags:
*      - Inventory
*      - Backend
*     parameters:
*       name: email
*       description: get email to get the diet of the user
*       required: true
*       type: String
*     security:
*       OAuth2: [user]
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
  * /inventory/search-recipes:
  *   get:
  *     security:
  *       OAuth2: [user]
  *     tags:
  *      - Inventory
  *      - Backend
  *     description: Search recipes with a query
  *     responses:
  *       200:
  *       description: get recipes
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
  * /inventory/menu:
  *   get:
  *     parameters:
  *       name: id
  *       description: id of the recipe
  *       required: true
  *       type: Number
  *     security:
  *       OAuth2: [user]
  *     tags:
  *      - Inventory
  *      - Backend
  *     description: Save a menu
  *     responses:
  *       204:
  *       description: menu saved
  *   post:
  *     parameters:
  *     - in: "body"
  *       name: Menu
  *       description: json of a Menu
  *       required: true
  *       type: Object
  *     security:
  *       OAuth2: [user]
  *     tags:
  *      - Inventory
  *      - Backend
  *     description: Save a menu
  *     responses:
  *       204:
  *       description: menu saved
  *   delete:
  *     produces:
  *     parameters:
  *       name: id
  *       description: id of the menu
  *       required: true
  *       type: Number
  *     security:
  *       OAuth2: [user]
  *     tags:
  *      - Inventory
  *      - Backend
  *     description: delete a menu
  *     responses:
  *       204:
  *       description: menu deleted
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
* /inventory/save-recipe:
*   post:
*     parameters:
*     - in: "body"
*       name: recipe
*       description: json of a recipe
*       required: true
*       type: Object
*     security:
*       OAuth2: [user]
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
  .route('/save-recipe') // esto no funciona
  .get(http.notImplemented)
  .post(ctrlInventory.saveRecipe)
  .put(http.notImplemented)
  .delete(http.notImplemented)
  // .delete('/delete-recipe', ctrlInventory.deleteRecipe)

module.exports = router
