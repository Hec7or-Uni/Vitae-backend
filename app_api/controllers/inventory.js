const mongoose = require('mongoose')
const User = mongoose.model('User')
const Menus = mongoose.model('Menus')
const winston = require('../../logs/logger')

const saveMenu = async (req, res) => {
  const { email, menu } = req.body
  // const aux = _menu.recipes.map(item => {
  //   return mongoose.Types.ObjectId(item)
  // })
  // console.log(aux)
  // const menu = {
  //   name: _menu.name,
  //   date: _menu.date,
  //   recipes: _menu.recipes
  // }
  // console.log(menu)
  const menuCreate = await Menus.create({ menu })
  console.log(menu.recipes)
  const user = await User.findOneAndUpdate(
    { email },
    { $push: { menus: menuCreate } },
    { new: true }
  )
  res.status(200).json(user)
}

const getMenu = async (req, res) => {
  const { _id } = req.query
  winston.info({ label: 'getMenu - OK ', message: 'Get menu:' + _id })
  const menu = await Menus.findById({ _id })
  if (!menu) {
    res.status(404).json({ err: 'No menu' })
  }
  res.status(200).json(menu)
}

const deleteMenu = async (req, res) => {
  const { email, menu } = req.body
  await User.updateOne({ email })
  res.status(200).json(menu)
}

const saveRecipe = async (req, res) => {
  const { email, recipe } = req.body
  recipe.spoonId = recipe.id
  console.log(recipe._id)
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
  getMenu,
  deleteMenu,
  saveRecipe,
  deleteRecipe
}
