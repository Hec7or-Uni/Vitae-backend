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
    // eslint-disable-next-line quote-props
    { email, 'saved-recipes.spoonId': { '$ne': recipe.id } },
    { $push: { saved_recipes: recipe } },
    { new: true }
  )
  res.status(200).json(user)
}

const deleteRecipe = async (req, res) => {
  const { email, id } = req.body
  let user = await User.findOne(email)
  user.saved_recipes.pull(id)
  user = await user.save()
  res.status(200).json(user)
}

module.exports = {
  saveMenu,
  // deleteMenu,
  saveRecipe,
  deleteRecipe
}
