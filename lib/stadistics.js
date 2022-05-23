const mongoose = require('mongoose')
const Stadistics = mongoose.model('Stadistics')
const { endOfDay, startOfDay } = require('date-fns')
const addVisit = async (req, res, next) => {
  await Stadistics.findOneAndUpdate({
    createdAt: {
      $gte: startOfDay(new Date()),
      $lte: endOfDay(new Date())
    }
  }, {
    $inc: { visitToPage: 1 }
  }, {
    new: true,
    upsert: true // Make this update into an upsert)
  })
  next()
}

module.exports = {
  addVisit
}
