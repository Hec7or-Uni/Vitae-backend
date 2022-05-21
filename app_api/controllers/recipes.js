const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
const spoon = require('../../lib/spoonacular')
const logger = require('../../logs/logger')

const recipeCreate = (req, res) => {
  if (req.body.spoonId && Recipe.findOne({ spoonId: req.body.spoonId })) {
    res.status(200).json({ message: 'Already created' })
    return
  }
  logger.info({ label: '/inventory', message: 'Create' })
  req.body.spoonId = req.body.id
  Recipe.create(
    req.body,
    (err, recipe) => {
      if (err) {
        logger.err({ label: '/inventory', message: err })
        res.status(400).json(err)
      } else {
        res.status(201).json(recipe)
      }
    })
}
const recipeCreateMultiple = (req, res) => {
  logger.info({ label: '/inventory', message: 'Create multiple' })
  Recipe.insertMany(
    req.body.recipes
    , (err, recipe) => {
      if (err) {
        logger.err({ label: '/inventory', message: err })
        res.status(400).json(err)
      } else {
        res.status(201).json(recipe)
      }
    })
}

const recipeReadOne = (req, res) => {
  const { id: _id, spoonId: _spoonId } = req.query
  logger.info({ label: '/inventory', message: 'Get recipe:' + _id + 'OR spoon:' + _spoonId })
  if (!_id) {
    Recipe
      .findById(req.query.recipeId)
      .exec((err, recipe) => {
        if (!recipe) {
          logger.err({ label: '/inventory', message: 'Recipe not found' })
          // Fetch recipe from spoonacular
          res.status(404).json({ message: 'Recipe not found' })
          return
        } else if (err) {
          logger.err({ label: '/inventory', message: err })
          res.status(404).json(err)
          return
        }
        res.status(200).json(recipe)
      })
  } else if (!_spoonId) {
    // Get recipe from spoonacular
  }
  logger.error({ label: '/inventory', message: 'no parameters' })
  res.status(404).json({ message: 'No parameters in request' })
}

const getRandomRecipe = async (req, res) => {
  logger.info({ label: '/inventory/random-recipes', message: 'random-recipe' })
  const data = await spoon.getRecipes()
  res
    .status(200)
    .json(data)
}

const nutrients = async function (req, res) {
  logger.info({ label: '/inventory/', message: 'nutrients' })
  const data = await spoon.getNutrition(req)
  res
    .status(200)
    .json(data)
}

const searchRecipe = async (req, res) => {
  logger.info({ label: '/inventory', message: 'search-recipe:' + req.search })
  const data = await spoon.searchRecipes('rice')
  res
    .status(200)
    .json(data)
}

const randomQuote = async (req, res) => {
  logger.info({ label: '/inventory', message: 'randomQuote:' })
  const data = await spoon.getQuote()
  res
    .status(200)
    .json(data)
}

const recipeReadAll = (req, res) => {
  logger.info({ label: '/inventory', message: 'recipeReadAll:' + req.params.quantity })
  if (req.params && req.params.quantity) {
    Recipe.find().limit(req.params.quantity).exec((err, recipes) => {
      if (err) {
        logger.err({ label: '/inventory', message: err })
        res.status(404).json(err)
      }
      res.status(200).json(recipes)
    })
  }
}

const recipeModify = (req, res) => {
  logger.info({ label: '/inventory', message: 'modify:' + req.body._id })
  Recipe.findByIdAndUpdate(req.body.id, req.body, { new: true }.exec((err, userModify) => {
    if (err) {
      logger.err({ label: '/inventory', message: err })
      res.status(404).json(err)
      return
    }
    res.status(200).json(userModify)
  }))
}

const recipeDelete = (req, res) => {
  logger.info({ label: '/inventory', message: 'delete:' + req.body._id })
  Recipe.findByIdAndDelete(req.body.i).exec((err, recipes) => {
    if (err) {
      logger.err({ label: '/inventory', message: err })
      res.status(404).json(err)
      return
    }
    res.status(200)
  })
}

module.exports = {
  searchRecipe,
  randomQuote,
  getRandomRecipe,
  nutrients,
  recipeCreate,
  recipeReadOne,
  recipeReadAll,
  recipeModify,
  recipeDelete,
  recipeCreateMultiple
}
