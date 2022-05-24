const express = require('express')
const router = express.Router()
const ctrlRecipes = require('../controllers/recipes')
const ctrlInventory = require('../controllers/inventory')
const http = require('../../lib/http')
const { authenticate } = require('../../lib/auth')

router
  .route('/', authenticate)
  .get(ctrlRecipes.recipeReadOne)
  .put(ctrlRecipes.recipeModify)
  .post(ctrlRecipes.recipeCreate)
  .delete(http.notImplemented)

router
  .route('/discovery', authenticate)
  .get(ctrlRecipes.recipeReadAll)
  .post(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)

router
  .route('/random-recipes', authenticate)
  .get(ctrlRecipes.getRandomRecipe)
  .post(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)

router
  .route('/search-recipes', authenticate)
  .get(ctrlRecipes.searchRecipe)
  .post(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)

router
  .route('/save-menu', authenticate)
  .post(ctrlInventory.saveMenu)
  .get(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)
  // .delete('/delete-menu', ctrlInventory.deleteMenu)

router
  .route('/save-recipe', authenticate)
  .post(ctrlInventory.saveRecipe)
  .get(http.notImplemented)
  .delete(http.notImplemented)
  .put(http.notImplemented)
  // .delete('/delete-recipe', ctrlInventory.deleteRecipe)

module.exports = router
