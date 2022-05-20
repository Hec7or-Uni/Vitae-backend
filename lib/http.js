const notImplemented = (req, res) => {
  res
    .status(501)
    .json({ message: 'Method not implemented.' })
}

module.exports = {
  notImplemented
}
