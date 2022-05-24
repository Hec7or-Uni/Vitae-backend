const mongoose = require('mongoose')
const User = mongoose.model('User')
const Account = mongoose.model('Accounts')
const winston = require('../../logs/logger')
const { __TODAY, fromTimestamp } = require('../../lib/dates')

const createAccount = async (req, res) => {
  await User.create(req.body)
    .then((user) => {
      winston.info({ label: 'createAccount - OK', message: user })
      res.status(201).json(user)
    })
    .catch(err => {
      winston.error({ label: 'createAccount - ERROR', message: err })
      res.status(500).json(err)
    })
}

const updateAccount = async (req, res) => {
  const { email, weight, ...data } = req.body
  await User.findOneAndUpdate({ email }, data, { new: true })
    .then(async user => {
      if (user.weight.length === 0) {
        user.weight.push({ weight, date: fromTimestamp(__TODAY) })
      } else if (!(user.weight[user.weight.length - 1].date === fromTimestamp(__TODAY))) {
        // caso para crear un nuevo peso
        user.weight.push({ weight, date: fromTimestamp(__TODAY) })
      } else {
        user.weight[user.weight.length - 1] = { weight, date: fromTimestamp(__TODAY) }
      }
      winston.info({ label: 'updateAccount - OK', message: user })
      user = await user.save()

      return res.status(204).json(user)
    })
    .catch(err => {
      winston.error({ label: 'updateAccount - ERROR', message: err })
      res.status(500).json(err)
    })
}

const getCredentials = async (req, res) => {
  const { email: _email } = req.body
  await User.findOne({ email: _email })
    .then(user => {
      winston.info({ label: 'getCredentials - OK', message: user })
      try {
        const { username, email, salt, hash, role } = user
        res.status(200).json({ username, email, salt, hash, role })
      } catch (err) {
        winston.error({ label: 'getCredentials - ERROR', message: err })
        res.status(500).json(err)
      }
    })
    .catch(err => {
      winston.error({ label: 'getCredentials - ERROR', message: err })
      res.status(500).json(err)
    })
}

const getCredentialsById = async (req, res) => {
  const { id } = req.body
  await User.findById({ _id: id })
    .then(user => {
      winston.info({ label: 'getCredentialsById - OK', message: user })
      try {
        const { username, email, salt, hash } = user
        res.status(200).json({ username, email, salt, hash })
      } catch (err) {
        winston.error({ label: 'getCredentialsById - ERROR', message: err })
        res.status(500).json(err)
      }
    }).catch(err => {
      winston.error({ label: 'getCredentialsById - ERROR', message: err })
      res.status(500).json(err)
    })
}

const deleteAccount = async (req, res) => {
  const { email } = req.body
  await User.deleteOne({ email })
    .then(user => {
      winston.info({ label: 'deleteAccount - OK', message: user })
      res.status(204).json(user)
    })
    .catch(err => {
      winston.error({ label: 'deleteAccount - ERROR', message: err })
      res.status(500).json(err)
    })
}

const getUser = async (req, res) => {
  const { email } = req.query
  await User.findOne({ email })
    .populate('saved_recipes')
    .populate({ path: 'menus.recipes', model: 'Recipe' })
    .then(user => {
      if (user === null) {
        winston.error({ label: 'getUser - ERROR', message: 'No user' })
        res.status(500).json({ message: 'No user' })
        return
      }
      winston.info({ label: 'getUser - OK', message: user })
      res.status(200).json(user)
    })
    .catch(err => {
      winston.error({ label: 'getUser - ERROR', message: err })
      res.status(500).json(err)
    })
}

const connectAccount = async (req, res) => {
  const { email, account: _account } = req.body
  let user = await User.findOne({ email })

  if (user === null || user === undefined) {
    res.status(404).json({ err: 'usuario no encontrados' })
    return
  }

  const accounts = user.accounts.filter(item => item.provider === _account.provider)
  if (accounts.length > 0) {
    res.status(400).json({ err: 'cuenta ya vinculada' })
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

module.exports = {
  createAccount,
  updateAccount,
  getCredentials,
  getCredentialsById,
  deleteAccount,
  getUser,
  connectAccount,
  disconnectAccount
}
