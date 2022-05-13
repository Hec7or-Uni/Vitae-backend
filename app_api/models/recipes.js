const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  createdOn: { type: Date, default: Date.now },
  commentText: String,
  username: String,
  response: String
})

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
  extendedIngredients: [ingredientSchema],
  commentSchema: [commentSchema]
})

recipeSchema.index({ spoonId: 1 }, { unique: true })
const dayMenuSchema = new mongoose.Schema({
  plate: [{
    recipeSchema: recipeSchema,
    mealType: String
  }],
  date: Date
})

mongoose.model('Recipe', recipeSchema)
mongoose.model('DayMenu', dayMenuSchema)
mongoose.model('Comment', commentSchema)
