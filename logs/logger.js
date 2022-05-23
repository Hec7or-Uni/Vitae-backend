
const { createLogger, format, transports } = require('winston') // for transports.Console
const path = require('path')
// const { timeStamp } = require('console')
const { timestamp, printf, combine } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

// { format: 'DD-MM-YYYY HH:mm:ss' }
module.exports = createLogger({
  format: combine(
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    myFormat
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '/../logs/error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '/../logs/api.log') }),
    new transports.Console()
  ]
})
