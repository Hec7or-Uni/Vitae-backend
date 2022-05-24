const express = require('express')
const router = express.Router()
const ctrlUsers = require('../controllers/users')
const ctrlStadistics = require('../controllers/admin')
const { addVisit } = require('../../lib/stadistics')
const ctrlComments = require('../controllers/comments')
const http = require('../../lib/http')
const { authenticate } = require('../../lib/auth')

/**
* @openapi
* /api/user/signup:
*   post:
*     description: Signup a user
*     parameters:
*     - name: email
*       description: email of the user
*       required: true
*       type: String
*     responses:
*       204:
*       description: Suscribed
*/
router
  .route('/signup')
  .get(http.notImplemented)
  .post(ctrlUsers.createAccount)
  .put(http.notImplemented)
  .delete(http.notImplemented)

/**
* @openapi
* /api/user/signin:
*   post:
*     description: Signup a user
*     parameters:
*     - name: email
*       description: email of the user
*       required: true
*       type: String
*     - password: email
*       description: password of the user
*       required: true
*       type: String
*     responses:
*       204:
*       description: Suscribed
*/
router
  .route('/signin')
  .get(http.notImplemented)
  .post(ctrlUsers.getCredentials)
  .put(http.notImplemented)
  .delete(http.notImplemented)

/**
* @openapi
* /api/user/update-account
*   put:
*     description: Modify a user
*     responses:
*       204:
*       description: user modified
*/
router
  .route('/update-account', authenticate)
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(ctrlUsers.updateAccount)
  .delete(http.notImplemented)

/**
* @openapi
* /api/user/
*   get:
*     description: get a user
*     responses:
*       200:
*       description: get user
*/
router
  .route('/', authenticate)
  .get(ctrlUsers.getUser)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(http.notImplemented)

/**
* @openapi
* /api/user/detele-account
*   delete:
*     description: Modify a user
*     responses:
*       201:
*       description: user modified
*/
router
  .route('/delete-account', authenticate)
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(ctrlUsers.deleteAccount)

/**
* @openapi
* /api/user/connect-account
*   put:
*     description: Connect a account from user
*     responses:
*       200:
*       description: Account connected
*/
router
  .route('/connect-account')
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(ctrlUsers.connectAccount)
  .delete(http.notImplemented)

/**
* @openapi
* /api/user/discconect-account
*   put:
*     description: Disconnect a account from user
*     responses:
*       200:
*       description: Account disconnected
*/
router
  .route('/disconnect-account')
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(ctrlUsers.disconnectAccount)
  .delete(http.notImplemented)

/**
* @openapi
* /api/user/comments
*   put:
*     description: Responde a comment in a recipe
*     responses:
*       200:
*       description: Account disconnected
*   post:
*     description: Create a comment in a recipe
*     responses:
*       200:
*       description: Account disconnected
*/
router
  .route('/comments', authenticate)
  .get(http.notImplemented)
  .post(ctrlComments.createComment)
  .put(ctrlComments.putComment) // .put(ctrlComments.putComment)
  .delete(ctrlComments.deleteComment) // .delete(ctrlComments.deleteComment)

router.post('/comment-reply', ctrlComments.respondeComment)
/**
* @openapi
* /api/user/statistics
*   put:
*     description: Count a visit
*     responses:
*       200:
*       description: Account disconnected
*   get:
*     description: Get the statistics of the app
*     responses:
*       200:
*       description: Account disconnected
*/
router
  .get('/statistics', ctrlStadistics.stadistics)
  .put('/statistics', addVisit)
module.exports = router
