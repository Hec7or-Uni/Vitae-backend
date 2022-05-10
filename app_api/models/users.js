const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

// User schema
const UserSchema = new mongoose.Schema({
  name: String,
  weight: [Number], // Array objetos
  diet: String,
  height: Number,
  birth: String,
  email: String,
  password: String,
  savedRecipes: { type: [Schema.Types.ObjectId], ref: 'Recipe' },
  menu: { type: [Schema.Types.ObjectId], ref: 'DayMenu' }
})

// Federated schema

const FederatedCredentialSchema = new mongoose.Schema({
  user: UserSchema,
  provider: String,
  subject: String
})

const todosSchema = new mongoose.Schema({
  owner_id: Number,
  title: String,
  completed: Number
})

// Unique constrains
UserSchema.index({ email: 1 }, { unique: true })
// UserSchema.index({ provider: 1 }, { unique: true })
// UserSchema.index({ subject: 1 }, { unique: true })
// Hash the password
UserSchema.pre('save', function (next) {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null)
  }
  next()
})

// Validates password
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.dateToString = function (date) {
  // TODO
}

UserSchema.methods.stringToDate = function (date) {
  // TODO
}

module.exports = mongoose.model('User', UserSchema)
// module.exports = mongoose.model('FederatedCredentials', FederatedCredentialSchema)
// module.exports = mongoose.model('Todos', todosSchema)
