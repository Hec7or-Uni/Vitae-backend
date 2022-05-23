const mongoose = require('mongoose')
const User = mongoose.model('User')
const spoon = require('../../lib/spoonacular')
const logger = require('../../lib/logger')

const stadistics = async (req, res) => {
  const data = {}
  data.registerUsers = await User.countDocuments({})
  res.status(200).json(data)
}

module.exports = {
  stadistics
}
