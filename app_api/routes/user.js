const express = require('express')
const router = express.Router()
const ctrlUsers = require('../controllers/users')
const ctrlComments = require('../controllers/comments')
const http = require('../../lib/http')
const { authenticate } = require('../../lib/auth')

router
  .route('/signup')
  .get(http.notImplemented)
  .post(ctrlUsers.createAccount)
  .put(http.notImplemented)
  .delete(http.notImplemented)

router
  .route('/signin')
  .get(http.notImplemented)
  .post(ctrlUsers.getCredentials)
  .put(http.notImplemented)
  .delete(http.notImplemented)

router
  .route('/update-account', authenticate)
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(ctrlUsers.updateAccount)
  .delete(http.notImplemented)

router
  .route('/', authenticate)
  .get(ctrlUsers.getUser)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(http.notImplemented)

router
  .route('/delete-account', authenticate)
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(ctrlUsers.deleteAccount)

router
  .route('/connect-account')
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(ctrlUsers.connectAccount)
  .delete(http.notImplemented)

router
  .route('/disconnect-account')
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(ctrlUsers.disconnectAccount)
  .delete(http.notImplemented)

router
  .route('/comments', authenticate)
  .get(http.notImplemented)
  .post(ctrlComments.createComment)
  .put(http.notImplemented) // .put(ctrlComments.putComment)
  .delete(http.notImplemented) // .delete(ctrlComments.deleteComment)

module.exports = router
