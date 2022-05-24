const SEP = '-'
const __TODAY = toTimestamp(toDate(new Date()))

function zfill (number, width) {
  width -= number.toString().length
  if (width > 0) { return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number }
  return number + ''
}

/**
 * Recibe un Date con formato: 'yyyy-mm-dd' y devuelve su
 * equivalente en timestamp
 * @param {String} date
 * @returns {Number} timestamp
 */
function toTimestamp (date) {
  return new Date(date).getTime()
}

/**
 * Recibe un timestamp y lo transforma al formato original de tipo Date String
 * @param {Number} timestamp
 * @returns {String} Date con formato: 'yyyy-mm-dd'
 */
function fromTimestamp (timestamp) {
  const date = new Date(timestamp)
  return String(date.getFullYear()) + SEP + zfill(String(date.getMonth() + 1), 2) + SEP + zfill(String(date.getDate()), 2)
}

/**
 * Recibe un Date con formato: Mon May 23 2022 09:15:56 GMT+0200 (hora de verano de Europa central)
 * y lo transforma en un Date con formato: '2022-05-23'
 * @param {String} date
 * @returns {String} Date con formato: 'yyyy-mm-dd'
 */
function toDate (date) {
  return String(date.getFullYear()) + SEP + zfill(String(date.getMonth() + 1), 2) + SEP + zfill(String(date.getDate()), 2)
}

/**
 * Recibe una fecha en formato: 'yyyy-mm-dd' y devuelve su equivalente
 * con el formato 'dd-mm-yyyy'
 * @param {string} date
 * @returns {String} Date con formato: 'dd-mm-yyyy'
 */
function format (date) {
  const [year, month, day] = date.split('-')
  return day + SEP + month + SEP + year
}

module.exports = {
  __TODAY,
  toTimestamp,
  fromTimestamp,
  toDate,
  format
}
