const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
const Recipe = mongoose.model('Recipe')

const createComment = async (req, res) => {
  const { id: _id, comment: _comment } = req.body
  const commentCreated = await Comment.create(_comment)
  const data = await Recipe.findByIdAndUpdate(
    _id, { $push: { commentSchema: commentCreated } }
  )
  res.status(200).json(data)
}

// const putComment = async (req, res) => {
//   const { comment: _comment } = req.body
//   const commentFinded = await Comment.findByIdAndUpdate(_comment._id, _comment)
//   await Recipe.findOneAndUpdate(
//     { 'comments._id': _comment._id },
//     { $set: { 'comments.$.commentText': _comment.commentText } }
//   )
//   res.status(200).json(commentFinded)
// }

// const deleteComment = async (req, res) => {
//   const { comment: _comment } = req.body
//   await Comment.findByIdAndDelete(_comment.id)
//   const data = await Recipe.findOneAndUpdate(
//     { 'comments._id': _comment._id },
//     { $pull: { comments: _comment } }
//   )
//   res.status(200).json(data)
// }

module.exports = {
  createComment
  // putComment,
  // deleteComment
}
