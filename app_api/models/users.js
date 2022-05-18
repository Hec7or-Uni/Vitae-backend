const mongoose = require('mongoose')

// User schema
const AccountSchema = new mongoose.Schema({
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
  oauth_token_secret: String,
  oauth_token: String
})

const SessionSchema = new mongoose.Schema({
  id: String,
  sessionToken: String,
  userId: String,
  expire: Date
})

const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  username: String,
  height: Number,
  weight: [Number], // Array objetos
  diet: String,
  birth: String,
  email: String,
  salt: String,
  password: String,
  savedRecipes: [mongoose.model('Recipe').schema],
  menu: [mongoose.model('DayMenu').schema],
  accounts: [AccountSchema],
  sessions: [SessionSchema]
})

// Unique constrains
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ username: 1 }, { unique: true })

module.export = mongoose.model('Account', AccountSchema)
module.export = mongoose.model('User', UserSchema)
module.export = mongoose.model('Session', SessionSchema)
