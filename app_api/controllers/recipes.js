const mongoose = require('mongoose')
const Rec = mongoose.model('Recipe')
const spoon = require('./spoon')

const recipeCreate = function (req, res) {
  console.log(req.body.id)
  console.log(req.body)
  Rec.create(
    req.body
    // spoonId: req.body.spoonId,
    // title: req.body.title,
    // image: req.body.image,
    // readyInMinutes: req.body.readyInMinutes,
    // healthScore: req.body.healthScore,
    // spoonacularScore: req.body.spoonacularScore,
    // instructions: req.body.instructions,
    // summary: req.body.summary,
    // extendedIngredients: req.body.extendedIngredients
    , (err, recipe) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(recipe)
      }
    })
}

const recipeReadOne = function (req, res) {
  console.log(req.query)
  if (req.query && req.query.recipeId) {
    Rec
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

const getRandomRecipe = async function (req, res) {
  console.log('aqui llego')
  const data = await spoon.getRecipes()
  res
    .status(200)
    .json(data)
  console.log(res)
  console.log('de aqui salgo')
  // Rec
  //  .create(data)
}

const searchRecipe = async function (req, res) {
  const data = await spoon.searchRecipes('rice')
  res
    .status(200)
    .json(data)
  console.log(res)
  // Rec
  //  .create(data)
}

const randomQuote = async function (req, res) {
  const data = await spoon.getQuote()
  res
    .status(200)
    .json(data)
  console.log(res)
}

const recipeReadAll = function (req, res) {
  if (req.params && req.params.quantity) {
    Rec.find().limit(req.params.quantity).exec((err, recipes) => {
      if (err) {
        res.status(404).json(err)
      }
      res.status(200).json(recipes)
    })
  }
}

const recipeModify = function (req, res) {
  Rec.findByIdAndUpdate(req.body.recipe.id, req.body.recipe, { new: true }.exec((err, userModify) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).json(userModify)
  }))
}

const recipeDelete = function (req, res) {
  Rec.findByIdAndDelete(req.body.recipe.i).exec((err, recipes) => {
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
  recipeCreate,
  recipeReadOne,
  recipeReadAll,
  recipeModify,
  recipeDelete
}
