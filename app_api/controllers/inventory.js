const mongoose = require('mongoose')
const User = mongoose.model('User')

const saveMenu = async (req, res) => {
  const { email, menu } = req.body
  const user = await User.findOneAndUpdate(
    { email },
    { $push: { menus: menu } },
    { new: true }
  )
  res.status(200).json(user)
}

// const deleteMenu = async (req, res) => {
//   const { email, recipe } = req.body
//   const user = await User.updateOne({ email })
//   res.status(200).json(user)
// }

const saveRecipe = async (req, res) => {
  const { email, recipe } = req.body
  recipe.spoonId = recipe.id
  const user = await User.findOneAndUpdate(
    { email },
    { $push: { saved_recipes: recipe } },
    { new: true }
  )
  res.status(200).json(user)
}

const deleteRecipe = async (req, res) => {
  const { email, recipe } = req.body
  const data = await User.findOneAndUpdate(
    { email },
    { $pull: { saved_recipes: recipe } }
  )
  res.status(200).json(data)
}

module.exports = {
  saveMenu,
  // deleteMenu,
  saveRecipe,
  deleteRecipe
}
