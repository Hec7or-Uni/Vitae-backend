const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const ctrlAuth = require('../controllers/auth')
require('dotenv').config()
const secret = process.env.secretOrKey
router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.post('/singupTest', ctrlAuth.singUpTest)

router.get('/google/callback',
  passport.authenticate('google'), createToken)

router.post('/signup',
  passport.authenticate('signup', { session: false }), (req, res) => {
    const token = jwt.sign({ email: req.user.email, _id: req.user._id }, secret)
    res.json({ token })
  })
router.post('/login',
  passport.authenticate('login'),
  (req, res) => {
    console.log(req.user._id)
    const token = jwt.sign({ email: req.user.email, _id: req.user._id }, secret)
    res.json({ token })
  })
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: 'You did it',
    user: req.user
  })
})

function createToken (req, res) {
  console.log('createToken')
  console.log(req.user.email)
  const token = jwt.sign({ email: req.user.email, _id: req.user._id }, secret)
  res.json({ token })
}

module.exports = router
