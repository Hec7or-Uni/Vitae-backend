const mongoose = require('mongoose')
const User = mongoose.model('User')
const Recipe = mongoose.model('Recipe')

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
  const { email: _email } = req.body
  const user = await User.findOneAndUpdate({ email: _email }, req.body)
  res.status(200).json(user, 2, null)
}

const getCredentials = async (req, res) => {
  const { email: _email } = req.body
  const { _id, username, email, salt, hash } = await User.findOne({ email: { $eq: _email } }, req.body)
  res.status(200).json({ _id, username, email, salt, hash }, 2, null)
}

const deleteAccount = async (req, res) => {
  const { email: _email } = req.body
  const user = await User.deleteOne({ email: _email })
  res.status(200).json(user, 2, null)
}

const connectAccount = async (req, res) => {
  res.status(200).json({}, 2, null)
}

const getUser = async (req, res) => {
  const { email: _email } = req.query
  const user = await User.findOne({ email: _email })
  res.status(200).json(user, 2, null)
}

// ------------------
const getStorage = (req, res) => {
  User
    .findById(req.user._id)
    .select({
      savedRecipes: 1
    })
    .exec((err, recipes) => {
      if (!recipes) {
        res.status(200).json({ message: 'Not recipes yet' })
        return
      } else if (err) {
        res.status(404).json(err)
        return
      }
      res.status(200).json(recipes)
    })
}

const getMenu = (req, res) => {
  User
    .findById(req.user._id).select({
      menu: 1
    })
    .exec((err, menu) => {
      if (!menu) {
        res.status(200).json({ message: 'Not menus yet' })
        return
      } else if (err) {
        res.status(404).json(err)
        return
      }
      res.status(200).json(menu)
    })
}

const modify = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true }.exec((err, userModify) => {
    if (!userModify) {
      res.status(400).json({ message: 'User not found' })
      return
    }
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).json(userModify)
  }))
}

const addWeight = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $push: { weight: req.body } }
      .exec((err, userModify) => {
        if (!userModify) {
          res.status(400).json({ message: 'User not found' })
          return
        }
        if (err) {
          res.status(404).json(err)
          return
        }
        res.status(200).json(userModify)
      }))
}

const addStorage = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $push: { savedRecipes: req.body } }.exec((err, userModify) => {
      if (!userModify) {
        res.status(400).json({ message: 'User not found' })
        return
      }
      if (err) {
        res.status(404).json(err)
        return
      }
      res.status(200).json(userModify)
    }))
}
const addMenuItem = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $push: { menu: req.body } }.exec((err, userModify) => {
      if (!userModify) {
        res.status(400).json({ message: 'User not found' })
        return
      }
      if (err) {
        res.status(404).json(err)
        return
      }
      res.status(200).json(userModify)
    }))
}

const modifyMenu = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { menu: req.body }.exec((err, userModify) => {
      if (!userModify) {
        res.status(400).json({ message: 'User not found' })
        return
      }
      if (err) {
        res.status(404).json(err)
        return
      }
      res.status(200).json(userModify)
    }))
}

const deleteUser = (req, res) => {
  Recipe.findByIdAndDelete(req.user._id).exec((err, userDeleted) => {
    if (!userDeleted) {
      res.status(400).json({ message: 'User not found' })
      return
    }
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200)
  })
}
const getDailyBuy = (req, res) => {}

// const getUser = async (req, res) => {
//   User
//     .findById(req.user._id)
//     .select({
//       name: 1,
//       height: 1,
//       birth: 1,
//       email: 1,
//       diet: 1
//     })
//     .exec((err, recipes) => {
//       if (!recipes) {
//         res.status(200).json({ message: 'Not recipes yet' })
//         return
//       } else if (err) {
//         res.status(404).json(err)
//         return
//       }
//       res.status(200).json(recipes)
//     })
// }

module.exports = {
  createAccount,
  updateAccount,
  getCredentials,
  deleteAccount,
  connectAccount,
  getStorage,
  getMenu,
  modify,
  addWeight,
  deleteUser,
  getDailyBuy,
  getUser,
  addStorage,
  addMenuItem,
  modifyMenu
}
