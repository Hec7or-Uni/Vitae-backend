const { getCredentials } = require('./users')
const emails = require('lib/emails')
const jwt = require('jsonwebtoken')

const recover = async (req, res) => {
  const method = req.method

  if (method === 'GET') {
    const { email } = req.query
    const user = await getCredentials(email)
    if (!user) {
      res.status(400)
      return
    }

    // User exist -> One time link valid for 15min
    const secret = process.env.SECRET + user.passwd
    const payload = {
      id: user.id,
      email: email
    }
    const token = jwt.sign(payload, secret, { expiresIn: '15m' })
    const link = `${process.env.NEXT_PUBLIC_URL}/recovery/reset-password/${user.id}/${token}`

    await emails(user.email, 'Recuperacion de contraseña', link)
      .catch(err => console.error(err))

    res.status(200)
  }
}

module.exports = {
  recover
}
