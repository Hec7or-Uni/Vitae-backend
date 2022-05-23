const jsPDF = require('jspdf')
const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
const spoon = require('../../lib/spoonacular')
const logger = require('../../logs/logger')
const datos = {}

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
  Recipe.insertMany(req.body.recipes, (err, recipe) => {
    if (err) {
      logger.err({ label: '/inventory', message: err })
      res.status(400).json(err)
    } else {
      res.status(201).json(recipe)
    }
  })
}

const recipeReadOne = (req, res) => {
  const { spoonId } = req.query
  logger.info({ label: '/inventory', message: 'Get recipe:' + spoonId })
  Recipe
    .findOne({ spoonId: Number(spoonId) })
    .exec((err, recipe) => {
      if (!recipe) {
        // logger.err({ label: '/inventory', message: 'Recipe not found' })
        // Fetch recipe from spoonacular
        res.status(404).json({ message: 'Recipe not found' })
        return
      } else if (err) {
        // logger.err({ label: '/inventory', message: err })
        res.status(404).json(err)
        return
      }
      res.status(200).json(recipe)
    })
}

const getRandomRecipe = async (req, res) => {
  logger.info({ label: '/inventory/random-recipes', message: 'random-recipe' })
  let { recipes } = await spoon.getRecipes()
  recipes = recipes.map(recipe => {
    return {
      ...recipe,
      spoonId: recipe.id
    }
  })
  recipes = await Recipe.insertMany(recipes, { continueOnError: true })
  res
    .status(200)
    .json(recipes)
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

const notDefinedFunct = function (req, res) {
  const data = { message: 'function not implemented' }
  res
    .status(407)
    .json(data)
  console.log('function not implemented')
}

const generateList = async function (req, res) {
  const dict = new Map()
  let item = {}
  const ingredientes = datos.data.recipes[0].extendedIngredients
  for (const value of ingredientes) {
    item = {}
    item = { nombre: value.name, cantidad: value.amount, unidad: value.unit }
    if (dict.has(value.id)) {
      item.cantidad = dict.get(value.id).cantidad + value.amount
    }
    dict.set(value.id, item)
  }
  const obj = Object.fromEntries(dict)
  res
    .status(207)
    .json(obj)
}

const generateListQR = async function (req, res) {
  const dict = new Map()
  let item = {}
  const ingredientes = datos.data.recipes[0].extendedIngredients
  for (const value of ingredientes) {
    item = {}
    item = { nombre: value.name, cantidad: value.amount, unidad: value.unit }
    if (dict.has(value.id)) {
      item.cantidad = dict.get(value.id).cantidad + value.amount
    }
    dict.set(value.id, item)
  }
  const obj = Object.fromEntries(dict)
  const doc = jsPDF.jsPDF()
  let lista = 'My shopping list \n\n================================\n'
  for (const [key, i] of dict) {
    console.log(key)
    lista = lista + '\n [   ]  ' + +i.cantidad + ' ' + i.unidad + ' of ' + i.nombre + '\n'
  }
  console.log(lista)
  doc.text(lista, 20, 20)
  doc.save('a4.pdf')
  res
    .status(207)
    .json(obj)
}

module.exports = {
  searchRecipe,
  randomQuote,
  getRandomRecipe,
  generateList,
  nutrients,
  recipeCreate,
  recipeReadOne,
  recipeReadAll,
  recipeModify,
  recipeDelete,
  recipeCreateMultiple,
  generateListQR,
  notDefinedFunct
}
