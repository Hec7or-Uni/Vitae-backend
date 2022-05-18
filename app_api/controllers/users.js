const mongoose = require('mongoose')
const User = mongoose.model('User')
const Recipe = mongoose.model('Recipe')

const getStorage = (req, res) => {
  const values = {
    savedRecipes: 1
  }
  User
    .findById(req.user._id)
    .select(values)
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
  const values = {
    menu: 1
  }
  User
    .findById(req.user._id).select(values)
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
    }
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200)
  })
}
const getDailyBuy = (req, res) => {}
const getUser = async (req, res) => {
  const values = {
    name: 1,
    height: 1,
    birth: 1,
    email: 1,
    diet: 1
  }
  User
    .findById(req.user._id)
    .select(values)
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
module.exports = {
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
