const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose
// User schema
const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  username: String,
  weight: [Number], // Array objetos
  diet: String,
  height: Number,
  birth: String,
  email: String,
  password: String,
  savedRecipes: [mongoose.model('Recipe').schema],
  menu: [mongoose.model('DayMenu').schema]
})

// Federated schema

// const FederatedCredentialSchema = new mongoose.Schema({
//  user: UserSchema,
//  provider: String,
//  subject: String
// })
//
// const todosSchema = new mongoose.Schema({
//  owner_id: Number,
//  title: String,
//  completed: Number
// })

// Unique constrains
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ username: 1 }, { unique: true })

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
  const text = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay()
  return text
}

UserSchema.methods.stringToDate = function (stringDate) {
  const myArray = stringDate.split('/')
  return new Date(myArray)
}

module.exports = mongoose.model('User', UserSchema)
// module.exports = mongoose.model('FederatedCredentials', FederatedCredentialSchema)
// module.exports = mongoose.model('Todos', todosSchema)
