const express = require('express')
const router = express.Router()
const ctrlUsers = require('../controllers/users')
const ctrlComments = require('../controllers/comments')
const { authenticate } = require('../../lib/auth')

router.post('/signin', ctrlUsers.getCredentials)
router.post('/signup', ctrlUsers.createAccount)
router.put('/update-account', authenticate, ctrlUsers.updateAccount)
router.get('/', authenticate, ctrlUsers.getUser)
router.delete('/delete-account', authenticate, ctrlUsers.deleteAccount)
router.put('/connect-account', ctrlUsers.connectAccount)
router.put('/disconnect-account', ctrlUsers.disconnectAccount)

router
  .route('/comments', authenticate)
  .get(ctrlComments.getComments)
  .post(ctrlComments.createComment)
  .put(ctrlComments.putComment)
  .delete(ctrlComments.deleteComment)

module.exports = router
