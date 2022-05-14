const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
require('dotenv').config()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true
},
async (request, accessToken, refreshToken, profile, done) => {
  console.log('ID: ' + profile.id)
  console.log('Name: ' + profile.displayName)
  const email = profile.emails[0].value
  const user = await UserModel.findOne({ email })
  if (!user) {
    console.log('CREATE NEW USER' + email)
    return done(null, UserModel.create({ email }))
  }
  return done(null, user)
}
))

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const user = await UserModel.findOne({ email: email })
  if (!user) {
    return done(null, false, { message: 'User not found' })
  }
  if (!user.validPassword(password)) {
    return done(null, false, { message: 'Incorrect password' })
  }
  return done(null, user, { message: 'Login succesful' })
}
))

const singUpTest = async (req, res) => {
  console.log('aaaa')
  console.log(req.body)
  await UserModel.create(
    req.body
    , (err, recipe) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(recipe)
      }
    })
}

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  // if (!UserModel.findOne({ email })) {)
  return done(null, UserModel.create({ email, password }))
  // }
}
))

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.secretOrKey,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    (jwtPayload, cb) => {
      return cb(null, jwtPayload)
    }
  )
)
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

module.exports = {
  singUpTest
}
