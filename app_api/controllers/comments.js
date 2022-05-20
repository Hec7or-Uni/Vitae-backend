const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
const Recipe = mongoose.model('Recipe')

const getComments = function (req, res) {}
const createComment = function (req, res) {
  const { id: _id, comment: _comment } = req.body
  const commentCreated = Comment.create(_comment)
  Recipe.findByIdAndUpdate(
    _id,
    { $push: { comments: commentCreated } }
  )
}
const putComment = function (req, res) {
  const { id: _id, comment: _comment } = req.body
  // const commentFinded = Comment.findByIdAndUpdate(_comment.id, _comment)  Probar las dos
  Recipe.findByIdAndUpdate(
    { _id, 'comments.id': _comment.id },
    { $set: { 'comments.$': _comment } }
  )
}
const deleteComment = function (req, res) {
  const { comment: _comment } = req.body
  Comment.findByIdAndDelete(_comment.id)
}

module.exports = {
  getComments,
  createComment,
  putComment,
  deleteComment
}
