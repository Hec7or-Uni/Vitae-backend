const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
const Recipe = mongoose.model('Recipe')

const createComment = async (req, res) => {
  const { id, comment } = req.body
  // comment.response = {}
  // const commentCreated = await Comment.create(comment)
  // comment._id = mongoose.Types.ObjectId().toHexString()
  const data = await Recipe.findByIdAndUpdate(
    id, { $push: { comments: comment } }, { new: true }
  )
  res.status(200).json(data)
}

const respondeComment = async (req, res) => {
  const { parentId, comment } = req.body
  console.log(parentId, comment)
  // const commentCreated = await Comment.create(comment)
  const data = await Recipe.findOneAndUpdate(
    { 'comments._id': parentId }
    , { $push: { 'comments.$.response': comment } },
    { new: true }
  )
  res.status(200).json(data)
}
const putComment = async (req, res) => {
  const { comment: _comment } = req.body
  console.log(_comment)
  const commentFinded = await Comment.findByIdAndUpdate(_comment._id, _comment)
  await Recipe.findOneAndUpdate(
    { 'comments._id': _comment._id },
    { $set: { 'comments.$.content': _comment.content } }
  )
  res.status(200).json(commentFinded)
}

const deleteComment = async (req, res) => {
  const { _id } = req.body
  // console.log(_id)
  await Comment.findByIdAndDelete(_id)
  const recipe = await Recipe.findOne(
    { 'comments._id': _id }
  )
  recipe.comments.pull(_id)
  res.status(200).json(recipe.save())
}

module.exports = {
  createComment,
  respondeComment,
  putComment,
  deleteComment
}
