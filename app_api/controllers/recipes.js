const mongoose = require('mongoose')
const Rec = mongoose.model('Recipe')
const spoon = require('./spoon')

const recipeCreate = function (req, res) {
  Rec.create({
    spoonId: req.body.spoonId,
    title: req.body.title,
    image: req.body.image,
    readyInMinutes: req.body.readyInMinutes,
    healthScore: req.body.healthScore,
    spoonacularScore: req.body.spoonacularScore,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    commentSchema: req.body.commentSchema
  }, (err, recipe) => {
    if (err) {
      res
        .status(400)
        .json(err)
    } else {
      res
        .status(201)
        .json(recipe)
    }
  })
}

const recipeReadOne = function (req, res) {
  if (req.params && req.params.recipeId) {
    Rec
      .findById(req.params.locationid)
      .exec((err, recipe) => {
        if (!recipe) {
          res
            .status(404)
            .json({
              message: 'locationid not found'
            })
          return
        } else if (err) {
          res
            .status(404)
            .json(err)
          return
        }
        res
          .status(200)
          .json(recipe)
      })
  } else {
    res
      .status(404)
      .json({
        message: 'No locationid in request'
      })
  }
}

const getRandomRecipe = async function (req, res) {
  console.log('aqui llego')
  const data = await spoon.searchRecipes()
  res
    .status(200)
    .json(data)
  console.log(res)
  console.log('de aqui salgo')
  // Rec
  //  .create(data)
}

module.exports = {
  getRandomRecipe,
  recipeCreate,
  recipeReadOne
}
