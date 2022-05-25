// const User = mongoose.model('User')
import recipes from '../data/recipes.json'
const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')
const poblate = function () {
  Recipe.insertMany(recipes)
}

module.exports = {
  poblate
}
