const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
  userId: String,
  type: String,
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
  role: { type: Number, default: 0 },
  lastname: String,
  username: String,
  email: String,
  salt: String,
  hash: String,
  accounts: [AccountSchema],
  sessions: [SessionSchema],
  birth: String,
  height: Number,
  gender: String,
  weight: [{
    weight: Number,
    date: String
  }], // Array objetos
  diet: String,
  saved_recipes: [{ type: mongoose.Types.ObjectId, ref: 'Recipe' }],
  menus: [mongoose.model('Menus').schema]
}, { timestamps: true })

// Unique constrains
UserSchema.index({ email: 1 }, { unique: true })

module.export = mongoose.model('Accounts', AccountSchema)
module.export = mongoose.model('User', UserSchema)
module.export = mongoose.model('Session', SessionSchema)
