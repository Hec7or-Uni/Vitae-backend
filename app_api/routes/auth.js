const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const ctrlAuth = require('../controllers/auth')
require('dotenv').config()
const secret = process.env.secretOrKey
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.post('/auth/singupTest', ctrlAuth.singUpTest)

router.get('/auth/google/callback',
  passport.authenticate('google'), createToken)

router.post('/auth/signup',
  passport.authenticate('signup', { session: false }), (req, res) => {
    const token = jwt.sign({ email: req.user.email, _id: req.user._id }, secret)
    res.json({ token })
  })
router.post('/auth/login',
  passport.authenticate('login'),
  (req, res) => {
    console.log(req.user._id)
    const token = jwt.sign({ email: req.user.email, _id: req.user._id }, secret)
    res.json({ token })
  })
router.get('/protected', (req, res) => {
  console.log(req)
  const token = jwt.sign({ email: req.body.user.email }, secret)
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
