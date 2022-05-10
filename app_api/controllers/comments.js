const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')

const getComments = function (req, res) {}
const createComment = function (req, res) {}
const putComment = function (req, res) {}
const deleteComment = function (req, res) {}

module.exports = {
  getComments,
  createComment,
  putComment,
  deleteComment
}
