const mongoose = require('mongoose')
const User = mongoose.model('User')
const Rec = mongoose.model('Recipe')

const getStorage = function (req, res) {
  if (req.params && req.params.recipeId) {
    const filter = {
      email: req.body.email
    }
    const values = {
      savedRecipes: 1
    }
    User
      .findById(filter)
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
  } else {
    res.status(404).json({ message: 'No recipe in request' })
  }
}

const getMenu = function (req, res) {
  if (req.params && req.params.recipeId) {
    const filter = {
      email: req.body.email
    }
    const values = {
      menu: 1
    }
    User
      .findById(filter).select(values)
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
  } else {
    res.status(404).json({ message: 'No recipe in request' })
  }
}
const modify = function (req, res) {
  User.findByIdAndUpdate(req.body.recipe.id, req.body.user, { new: true }.exec((err, userModify) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200).json(userModify)
  }))
}
const addWeight = function (req, res) {
  User.updateOne(
    { _id: req.body._id },
    { $push: { weight: req.body.weight } }
  )
}
const deleteUser = function (req, res) {
  Rec.findByIdAndDelete(req.body.recipe.i).exec((err, recipes) => {
    if (err) {
      res.status(404).json(err)
      return
    }
    res.status(200)
  })
}
const getDailyBuy = function (req, res) {}
const getUser = function (req, res) {
  if (req.params && req.params.recipeId) {
    const filter = {
      email: req.body.email
    }
    const values = {
      savedRecipes: 1
    }
    User
      .findById(filter)
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
  } else {
    res.status(404).json({ message: 'No recipe in request' })
  }
}
module.exports = {
  getStorage,
  getMenu,
  modify,
  addWeight,
  deleteUser,
  getDailyBuy,
  getUser
}
