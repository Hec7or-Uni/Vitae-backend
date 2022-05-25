const mongoose = require('mongoose')
const User = mongoose.model('User')
const Menus = mongoose.model('Menus')
const winston = require('../../logs/logger')

const saveMenu = async (req, res) => {
  const { email, menu } = req.body
  Menus.create(menu)

  const user = await User.findOneAndUpdate(
    { email },
    { $push: { menus: menu } },
    { new: true }
  )
  res.status(200).json(user.menus)
}

const getMenu = async (req, res) => {
  const { _id } = req.query
  winston.info({ label: 'getMenu - OK ', message: 'Get menu:' + _id })
  const menu = await Menus.findById({ _id }).populate('recipes')
  if (!menu) {
    res.status(404).json({ err: 'No menu' })
  }
  res.status(200).json(menu)
}

const deleteMenu = async (req, res) => {
  const { email, menuId } = req.body
  const user = await User.findOne(email)
  user.menus.pull(menuId)
  res.status(204).json(user.save())
}

const getAllMenus = async (req, res) => {
  winston.info({ label: 'getMenus - OK ', message: 'Get menus:' })
  const menus = await Menus.find().populate('recipes')
  res.status(200).json(menus)
}
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
  getMenu,
  getAllMenus,
  deleteMenu,
  saveRecipe,
  deleteRecipe
}
