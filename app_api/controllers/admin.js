const mongoose = require('mongoose')
const User = mongoose.model('User')
const Stadistics = mongoose.model('Stadistics')

const stadistics = async (req, res) => {
  const data = {}
  data.registerUsers = await User.countDocuments({})
  data.DailyVisits = await Stadistics.find()
  res.status(200).json(data)
}

module.exports = {
  stadistics
}
