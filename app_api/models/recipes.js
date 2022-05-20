const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new mongoose.Schema({
  username: String,
  commentText: String,
  response: String
}, { timestamps: true })

const ingredientSchema = new mongoose.Schema({
  name: String,
  image: String,
  amount: String,
  original: String,
  unit: String
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
  author: { type: [Schema.Types.ObjectId], ref: 'User' },
  extendedIngredients: [ingredientSchema],
  commentSchema: [commentSchema]
})

const dayMenuSchema = new mongoose.Schema({
  plate: [{
    recipeSchema: recipeSchema,
    mealType: String
  }],
  date: Date
})

module.export = mongoose.model('Ingredient', ingredientSchema)
module.export = mongoose.model('Comment', commentSchema)
module.export = mongoose.model('Recipe', recipeSchema)
module.export = mongoose.model('DayMenu', dayMenuSchema)
