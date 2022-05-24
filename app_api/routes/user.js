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
* /user/signup:
*   post:
*     tags:
*      - User
*      - Backend
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
* /user/signin:
*   post:
*     tags:
*      - User
*      - Backend
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
* /user/update-account
*   put:
*     description: Modify a user
*     responses:
*       204:
*         description: user modified
*/
router
  .route('/update-account', authenticate)
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(ctrlUsers.updateAccount)
  .delete(http.notImplemented)

/**
* @openapi
* /user/
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

/**
* @openapi
* /user/comments
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
  .get(ctrlComments.getRecipeComments)
  .post(ctrlComments.createComment)
  .put(ctrlComments.putComment) // .put(ctrlComments.putComment)
  .delete(ctrlComments.deleteComment) // .delete(ctrlComments.deleteComment)

router.post('/comment-reply', ctrlComments.respondeComment)

router
  .get('/statistics', ctrlStadistics.stadistics)
  .put('/statistics', addVisit)
module.exports = router
