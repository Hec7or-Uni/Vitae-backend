require('dotenv').config()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../../lib/emails')
const winston = require('../../logs/logger')

const recover = async (req, res) => {
  let { email } = req.query
  email = decodeURIComponent(email)
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400).json({ message: 'No user' })
    return
  }

  // User exist -> One time link valid for 15min
  const secret = process.env.NEXTAUTH_SECRET + user.passwd
  const payload = {
    id: user.id,
    email: email
  }
  const token = jwt.sign(payload, secret, { expiresIn: '15m' })
  const link = `${process.env.NEXTAUTH_URL}recovery/reset-password/${user.id}/${token}`

  await sendEmail(user.email, 'Recuperacion de contraseña', link)
    .then(emailSent => {
      winston.info({ label: 'recover - OK', message: emailSent })
      res.status(200).json(emailSent)
    })
    .catch(err => {
      winston.error({ label: 'recover - ERROR', message: err })
      res.status(500).json(err)
    })
}

module.exports = {
  recover
}
