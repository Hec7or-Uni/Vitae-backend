const mongoose = require('mongoose')

const stadisticsSchema = new mongoose.Schema({
  visitToPage: { type: Number, default: 0 },
  visitDiscover: Number,
  visitStorage: Number
}, { timestamps: true })
module.export = mongoose.model('Stadistics', stadisticsSchema)
