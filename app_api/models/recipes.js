const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  createdOn: { type: Date, default: Date.now },
  commentText: String,
  username: String
})

const ingredientSchema = new mongoose.Schema({
  title: String,
  image: String,
  quantity: String
})
const recipeSchema = new mongoose.Schema({
  spoonId: Number,
  title: String,
  image: String,
  readyInMinutes: Number,
  healthScore: Number,
  spoonacularScore: Number,
  instructions: String,
  ingredients: [ingredientSchema],
  commentSchema: [commentSchema]
})

mongoose.model('Recipe', recipeSchema)
