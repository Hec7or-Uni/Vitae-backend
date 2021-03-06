const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  creatorEmail: String,
  content: String,
  parentId: mongoose.Types.ObjectId
}, { timestamps: true })
commentSchema.add({ response: [commentSchema] })

const ingredientSchema = new mongoose.Schema({
  name: String,
  image: String,
  amount: String,
  original: String,
  unit: String
})

const stepsSchema = new mongoose.Schema({
  name: String,
  steps: [{
    number: Number,
    step: String
  }]
})

const recipeSchema = new mongoose.Schema({
  spoonId: Number,
  title: String,
  image: String,
  readyInMinutes: Number,
  healthScore: Number,
  spoonacularScore: Number,
  instructions: String,
  summary: String,
  nutrition: [{
    name: String,
    value: String
  }],
  extendedIngredients: [ingredientSchema],
  comments: [commentSchema],
  analyzedInstructions: [stepsSchema]
})
recipeSchema.index({ spoonId: 1 }, { unique: true })

const menuSchema = new mongoose.Schema({
  name: String,
  date: String,
  recipes: [{ type: mongoose.Types.ObjectId, ref: 'Recipe' }]
})

module.export = mongoose.model('Ingredient', ingredientSchema)
module.export = mongoose.model('Comment', commentSchema)
module.export = mongoose.model('Recipe', recipeSchema)
module.export = mongoose.model('Menus', menuSchema)
