const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
const Recipe = mongoose.model('Recipe')

const createComment = async (req, res) => {
  const { id: _id, comment } = req.body
  const commentCreated = await Comment.create(comment)
  // comment._id = mongoose.Types.ObjectId().toHexString()
  const data = await Recipe.findByIdAndUpdate(
    _id, { $push: { comments: commentCreated } }
  )
  res.status(200).json(data)
}

const respondeComment = async (req, res) => {
  const { id: _id, comment } = req.body
  // const commentCreated = await Comment.create(comment)
  const data = await Recipe.update(
    {
      _id,
      'comments._id': comment._id
    }
    , { $push: { 'comments.$.response': comment } }
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
  createComment,
  respondeComment
  // putComment,
  // deleteComment
}
