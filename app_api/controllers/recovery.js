const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../../lib/emails')

const recover = async (req, res) => {
  let { email } = req.query
  email = decodeURIComponent(email)
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    return
  }

  // User exist -> One time link valid for 15min
  const secret = process.env.NEXTAUTH_SECRET + user.passwd
  const payload = {
    id: user.id,
    email: email
  }
  const token = jwt.sign(payload, secret, { expiresIn: '15m' })
  // const link = `${process.env.NEXT_PUBLIC_URL}/recovery/reset-password/${user.id}/${token}`
  const link = `http://localhost:3000/recovery/reset-password/${user.id}/${token}`

  const emailSent = await sendEmail(user.email, 'Recuperacion de contraseña', link)
    .catch(err => console.error(err))

  res.status(200).json(emailSent)
}

module.exports = {
  recover
}
