const mongoose = require('mongoose')
const User = mongoose.model('User')
const Account = mongoose.model('Accounts')

const createAccount = async (req, res) => {
  await User.create(req.body)
    .then((user) => {
      res
        .status(200)
        .json(user)
    })
    .catch(err => {
      res
        .status(400)
        .json(err)
    })
}

const updateAccount = async (req, res) => {
  const { email } = req.body
  const user = await User.findOneAndUpdate({ email }, req.body)
  res.status(200).json(user)
}

const getCredentials = async (req, res) => {
  const { email: _email } = req.body
  console.log(_email)
  const { username, email, salt, hash } = await User.findOne({ email: _email })
  res.status(200).json({ username, email, salt, hash })
}

const getCredentialsById = async (req, res) => {
  const { id } = req.body
  const { username, email, salt, hash } = await User.findById({ _id: id })
  res.status(200).json({ username, email, salt, hash })
}

const deleteAccount = async (req, res) => {
  const { email } = req.body
  const user = await User.deleteOne({ email })
  res.status(200).json(user)
}

const getUser = async (req, res) => {
  const { email } = req.query
  const user = await User.findOne({ email })
    .populate('saved_recipes')
    .populate({ path: 'menus.recipes', model: 'Recipe' })
  res.status(200).json(user)
}

const connectAccount = async (req, res) => {
  const { email, account: _account } = req.body
  let user = await User.findOne({ email })
  if (user === null || user === undefined) {
    res.status(404).json({ message: 'usuario no encontrados' })
    return
  }
  const accounts = user.accounts.filter(item => item.provider === _account.provider)
  if (accounts.length > 0) {
    res.status(400).json({ message: 'cuenta ya vinculada' })
    return
  }
  user = await User.findOneAndUpdate({ email }, { $push: { accounts: _account } })
  user = await Account.create(_account)
  res.status(200).json(user)
}

const disconnectAccount = async (req, res) => {
  const { email, provider } = req.body
  res.status(200).json({ email, provider })
}

const getStats = async (req, res) => {
  const { email } = req.query
  // const { menus } = await User.findOne({ email }).populate('Recipe')
  const data = await User.findOne({ email }).populate('Recipe')
  // const temp = menus.map(item => {
  //   return {
  //     date: item.date,
  //     recipes: item.recipes.map(r => r.recipe)
  //   }
  // })

  res.status(200).json({ data })
}
const addWeight = async (req, res) => {
  const { email, weight } = req.body
  const data = await User.findOne(
    email,
    { $push: { weight: weight } }
    , { new: true })
  res.status(200).json(data)
}

const getMenus = async (req, res) => {
  const { email } = req.query
  const data = await User.findOne({ email }).populate({
    path: 'menus',
    populate: {
      path: 'recipes',
      model: 'Recipe'
    }
  })
  res.status(200).json({ data })
}

module.exports = {
  createAccount,
  updateAccount,
  getCredentials,
  getCredentialsById,
  deleteAccount,
  getUser,
  connectAccount,
  disconnectAccount,
  getStats,
  addWeight,
  getMenus
}
