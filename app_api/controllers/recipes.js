const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
const User = mongoose.model('User')
const spoon = require('../../lib/spoonacular')
const winston = require('../../logs/logger')

const recipeCreate = (req, res) => {
  if (req.body.spoonId && Recipe.findOne({ spoonId: req.body.spoonId })) {
    res.status(200).json({ message: 'Already created' })
    return
  }
  winston.info({ label: 'recipeCreate - OK', message: 'Create' })
  req.body.spoonId = req.body.id
  Recipe.create(
    req.body,
    (err, recipe) => {
      if (err) {
        winston.err({ label: 'recipeCreate', message: err })
        res.status(400).json(err)
      } else {
        res.status(201).json(recipe)
      }
    })
}

const recipeReadOne = async (req, res) => {
  const { spoonId } = req.query
  winston.info({ label: 'recipeReadOne - OK ', message: 'Get recipe:' + spoonId })
  let recipe = await Recipe.findOne({ spoonId: spoonId })
  if (!recipe) {
    res.status(404).json()
    return
  }

  if (recipe.nutrition === null || recipe.nutrition === undefined || recipe.nutrition.length === 0) {
    const nutrients = await spoon.getNutrition(spoonId)
    const nutrition = [{
      name: 'calories',
      value: nutrients.calories
    }, {
      name: 'carbs',
      value: nutrients.carbs
    }, {
      name: 'fat',
      value: nutrients.fat
    }, {
      name: 'protein',
      value: nutrients.protein
    }]
    recipe = await Recipe.findOneAndUpdate({ spoonId: spoonId }, { $push: { nutrition } }, { new: true })
  }
  res.status(200).json(recipe)
}

const getRandomRecipe = async (req, res) => {
  winston.info({ label: 'getRandomRecipe - OK', message: 'random-recipe' })
  const user = await User.findOne({ email: req.query.email })
  let { recipes } = await spoon.getRecipes({ dieta: user.diet })
  recipes = recipes.map(recipe => {
    return {
      ...recipe,
      spoonId: recipe.id
    }
  })
  recipes = await Recipe.insertMany(recipes, { continueOnError: true })
  res.status(200).json(recipes)
}

const searchRecipe = async (req, res) => {
  const { email, search } = req.query
  const user = await User.findOne({ email })
  winston.info({ label: '/inventory', message: 'search-recipe:' + search })
  const query = { query: search, dieta: user.diet }
  const data = await spoon.searchRecipes(query)
  res.status(200).json(data)
}

const recipeReadAll = (req, res) => {
  winston.info({ label: '/inventory', message: 'recipeReadAll:' + req.params.quantity })
  if (req.params && req.params.quantity) {
    Recipe.find().limit(req.params.quantity).exec((err, recipes) => {
      if (err) {
        winston.err({ label: '/inventory', message: err })
        res.status(404).json(err)
      }
      res.status(200).json(recipes)
    })
  }
}

const recipeModify = (req, res) => {
  winston.info({ label: '/inventory', message: 'modify:' + req.body._id })
  Recipe.findByIdAndUpdate(req.body.id, req.body, { new: true }.exec((err, userModify) => {
    if (err) {
      winston.err({ label: '/inventory', message: err })
      res.status(404).json(err)
      return
    }
    res.status(204).json(userModify)
  }))
}

const recipeDelete = (req, res) => {
  winston.info({ label: '/inventory', message: 'delete:' + req.body._id })
  Recipe.findByIdAndDelete(req.body.i).exec((err, recipes) => {
    if (err) {
      winston.err({ label: '/inventory', message: err })
      res.status(404).json(err)
      return
    }
    res.status(204)
  })
}

module.exports = {
  searchRecipe,
  getRandomRecipe,
  recipeCreate,
  recipeReadOne,
  recipeReadAll,
  recipeModify,
  recipeDelete
}

// searchRecipe,
// recipeDelete,
// recipeCreateMultiple,
