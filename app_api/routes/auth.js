const cookieParser = require('cookie-parser')
const dayjs = require('dayjs')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
// const { json } = require('express')
require('dotenv').config()
const secret = process.env.secretOrKey
router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/google/callback',
  passport.authenticate('google'), createToken)

router.post('/signup',
  passport.authenticate('signup', { session: false }), (req, res) => {
    const token = jwt.sign({ email: req.user.email, _id: req.user._id }, secret)
    res.cookie('secureCookie', token, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      expires: dayjs().add(30, 'days').toDate()
    })
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
  console.log('no funca' + req.cookies)
  res.json({
    message: 'You did it',
    user: req.user
  })
})

function createToken (req, res) {
  const token = jwt.sign({ email: req.user.email, _id: req.user._id }, secret)
  res.cookie('secureCookie', token, {
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    expires: dayjs().add(30, 'days').toDate()
  })
  res.json({ token })
}

module.exports = router
