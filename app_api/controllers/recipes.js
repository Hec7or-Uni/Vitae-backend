const mongoose = require('mongoose')
const Rec = mongoose.model('Recipe')
const spoon = require('./spoon')

const recipeCreate = function (req, res) {
  if (req.body.spoonId !== 0) {
    // Rec.findOne()
  }
  Rec.create(
    req.body
    , (err, recipe) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(recipe)
      }
    })
}

const recipeCreateMultiple = function (req, res) {
  Rec.insertMany(
    req.body
    , (err, recipe) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(recipe)
      }
    })
}

const recipeReadOne = function (req, res) {
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
  // console.log(res)
  console.log('de aqui salgo')
  console.log(data)
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
  Rec.findByIdAndUpdate(req.body.id, req.body, { new: true }.exec((err, userModify) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).json(userModify)
  }))
}

const recipeDelete = function (req, res) {
  Rec.findByIdAndDelete(req.body.i).exec((err, recipes) => {
    if (err) {
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

module.exports = {
  searchRecipe,
  randomQuote,
  getRandomRecipe,
  recipeCreate,
  recipeReadOne,
  recipeReadAll,
  recipeModify,
  recipeDelete,
  recipeCreateMultiple
}
