const express = require('express')
const router = express.Router()
const ctrlUsers = require('../controllers/users')
const ctrlComments = require('../controllers/comments')

router.post('/signin', ctrlUsers.getCredentials)
router.post('/signup', ctrlUsers.createAccount)
router.put('/update-account', ctrlUsers.updateAccount)
router.get('/', ctrlUsers.getUser)
router.delete('/delete-account', ctrlUsers.deleteAccount)
router.put('/connect-account', ctrlUsers.connectAccount)
router
  .route('/comments')
  .get(ctrlComments.getComments)
  .post(ctrlComments.createComment)
  .put(ctrlComments.putComment)
  .delete(ctrlComments.deleteComment)
module.exports = router
