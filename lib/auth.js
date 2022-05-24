require('dotenv').config()
const { getToken } = require('next-auth/jwt')

const authenticate = async (req, res, next) => {
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })
  console.log('token: ' + token)
  if (!token) {
    res.status(401).send({ message: 'You are not signed in' })
    return
  }
  next()
}

module.exports = {
  authenticate
}
