const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
const spoon = require('../../lib/spoonacular')
const logger = require('../../logs/logger')

const recipeCreate = (req, res) => {
  if (req.body.spoonId !== 0) {
    // Rec.findOne()
  }
  Recipe.create(
    req.body,
    (err, recipe) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(recipe)
      }
    })
}

const recipeCreateMultiple = (req, res) => {
  Recipe.insertMany(
    req.body
    , (err, recipe) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(recipe)
      }
    })
}

const recipeReadOne = (req, res) => {
  if (req.query && req.query.recipeId) {
    Recipe
      .findById(req.query.recipeId)
      .exec((err, recipe) => {
        if (!recipe) {
          res.status(404).json({ message: 'Recipe not found' })
          return
        } else if (err) {
          res.status(404).json(err)
          return
        }
        res.status(200).json(recipe)
      })
  } else {
    res.status(404).json({ message: 'No id in request' })
  }
}

const getRandomRecipe = async (req, res) => {
  const data = await spoon.getRecipes()
  logger.info({ label: '/inventory', message: 'random-recipe' })
  res
    .status(200)
    .json(data)
}

const nutrients = async function (req, res) {
  const data = await spoon.getNutrition(req)
  res
    .status(200)
    .json(data)
}

const searchRecipe = async (req, res) => {
  const data = await spoon.searchRecipes('rice')
  res
    .status(200)
    .json(data)
}

const randomQuote = async (req, res) => {
  const data = await spoon.getQuote()
  res
    .status(200)
    .json(data)
}

const recipeReadAll = (req, res) => {
  if (req.params && req.params.quantity) {
    Recipe.find().limit(req.params.quantity).exec((err, recipes) => {
      if (err) {
        res.status(404).json(err)
      }
      res.status(200).json(recipes)
    })
  }
}

const recipeModify = (req, res) => {
  Recipe.findByIdAndUpdate(req.body.id, req.body, { new: true }.exec((err, userModify) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).json(userModify)
  }))
}

const recipeDelete = (req, res) => {
  Recipe.findByIdAndDelete(req.body.i).exec((err, recipes) => {
    if (err) {
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
