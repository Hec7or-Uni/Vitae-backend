const mongoose = require('mongoose')
const Stadistics = mongoose.model('Stadistics')
const { endOfDay, startOfDay } = require('date-fns')

const addVisit = async (req, res) => {
  const { field } = req.body
  if (field === 'visitIndex') {
    await Stadistics.findOneAndUpdate({
      createdAt: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date())
      }
    }, { $inc: { visitIndex: 1 } }, {
      new: true,
      upsert: true // Make this update into an upsert)
    })
    res.status(200).json({ messge: 'visitIndex + 1' })
  } else if (field === 'visitHome') {
    await Stadistics.findOneAndUpdate({
      createdAt: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date())
      }
    }, { $inc: { visitHome: 1 } }, {
      new: true,
      upsert: true // Make this update into an upsert)
    })
    res.status(200).json({ messge: 'visitHome + 1' })
  } else {
    res.status(400).json({ error: 'error en el parametro' })
  }
}

module.exports = {
  addVisit
}
