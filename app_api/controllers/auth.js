const passport = require('passport')
const { getToken } = require('next-auth/jwt')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
require('dotenv').config()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const SECRET_OR_KEY = process.env.secretOrKey
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
  const email = profile.emails[0].value
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      console.log('CREATE NEW USER' + email)
      return done(null, UserModel.create({ email }))
    }
    return done(null, user)
  } catch (error) {
    return done(error)
  }
}
))

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email: email })
    if (!user) {
      return done(null, false, { message: 'User not found' })
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password' })
    }
    return done(null, user, { message: 'Login succesful' })
  } catch (error) {
    return done(error)
  }
}
))

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  console.log(req.body)
  try {
    const user = await UserModel.create(req.body)
    return done(null, user)
  } catch (error) {
    return done(error)
  }
}
// }
))

passport.use(
  new JWTStrategy(
    {
      secretOrKey: SECRET_OR_KEY,
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

const tokenAuth = async (req, res) => {
  const secret = SECRET_OR_KEY
  const token = await getToken({ req, secret })

  if (token) {
    // Signed in
    console.log('JSON Web Token', JSON.stringify(token, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}

module.exports = { tokenAuth }
