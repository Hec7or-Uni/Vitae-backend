const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  salt: String,
  password: String,
  savedRecipes: { type: [Schema.Types.ObjectId], ref: 'Recipe' }
})
// Unique index for username and email
UserSchema.index({ username: 1 }, { unique: true })
UserSchema.index({ email: 1 }, { unique: true })
// Hashing the password before saving it
UserSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }
          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

module.exports = mongoose.model('User', UserSchema)
