const mongoose = require('mongoose')

const stadisticsSchema = new mongoose.Schema({
  visitIndex: { type: Number, default: 0 },
  visitHome: { type: Number, default: 0 }
}, { timestamps: true })

module.export = mongoose.model('Stadistics', stadisticsSchema)
