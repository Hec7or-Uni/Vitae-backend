const mongoose = require('mongoose')
const Recipe = mongoose.model('Recipe')

const getRecipeComments = async (req, res) => {
  const { spoonId } = req.query
  await Recipe.findOne({ spoonId }).select({ comments: 1, _id: 0 })
    .then(comment => {
      res.status(200).json(comment)
    }).catch(err => {
      res.status(200).json(err)
    })
}

const createComment = async (req, res) => {
  const { recipeId, comment } = req.body
  const data = await Recipe.findOneAndUpdate(
    { spoonId: recipeId }, { $push: { comments: comment } }, { new: true }
  ).select({ _id: 1, spoonId: 1, comments: 1 })
  res.status(201).json(data)
}

const respondeComment = async (req, res) => {
  const { parentId, comment } = req.body
  comment.parentId = parentId
  const data = await Recipe.findOneAndUpdate(
    { 'comments._id': parentId }
    , { $push: { 'comments.$.response': comment } },
    { new: true }
  ).select({ _id: 1, spoonId: 1, comments: 1 })
  res.status(201).json(data)
}

const putComment = async (req, res) => {
  const { recipeId, comment: _comment } = req.body
  let recipe; let data
  if (_comment.parentId) { // es el hijo
    recipe = await Recipe.findOne({ spoonId: recipeId })
    recipe.comments.id(_comment.parentId).response.id(_comment._id).content = _comment.content
    data = await recipe.save()
  } else { // es el padre
    data = await Recipe.findOneAndUpdate({ spoonId: recipeId, 'comments._id': _comment._id },
      { $set: { 'comments.$.content': _comment.content } }, { new: true })
  }
  res.status(201).json(data)
}

const deleteComment = async (req, res) => {
  const { recipeId, comment: _comment } = req.body
  const recipe = await Recipe.findOne(
    { spoonId: recipeId }
  // { $set: { 'comments.$.content': _comment.content } }
  )
  if (_comment.parentId) { // es el hijo
    recipe.comments.id(_comment.parentId).response.pull(_comment._id)
  } else { // es el padre
    recipe.comments.pull(_comment._id)
  }
  res.status(204).json(recipe.save())
}

module.exports = {
  getRecipeComments,
  createComment,
  respondeComment,
  putComment,
  deleteComment
}
