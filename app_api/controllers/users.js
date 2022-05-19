const mongoose = require('mongoose')
const User = mongoose.model('User')

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
  const { username, email, salt, hash } = await User.findOne({ email: { $eq: _email } })
  res.status(200).json({ username, email, salt, hash })
}

const deleteAccount = async (req, res) => {
  const { email } = req.body
  const user = await User.deleteOne({ email })
  res.status(200).json(user)
}

const getUser = async (req, res) => {
  const { email: _email } = req.query
  const user = await User.findOne({ email: _email })
  res.status(200).json(user)
}

const connectAccount = async (req, res) => {
  const { email: _email, account } = req.body
  const user = await User.findOneAndUpdate({ email: _email }, { $push: { accounts: account } })
  res.status(200).json(user)
}
module.exports = {
  createAccount,
  updateAccount,
  getCredentials,
  deleteAccount,
  getUser,
  connectAccount
}
