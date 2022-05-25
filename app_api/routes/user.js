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
* /user/update-account:
*   put:
*     tags:
*      - User
*      - Backend
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
* /user:
*   get:
*     tags:
*      - User
*      - Backend
*     description: get a user
*     responses:
*       200:
*       description: get user
*/
router
  .use(authenticate)
  .route('/')
  .get(ctrlUsers.getUser)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(http.notImplemented)

/**
* @openapi
* /user/delete-account:
*   delete:
*     tags:
*      - User
*      - Backend
*     description: delete a user
*     responses:
*       200:
*       description: user delete
*/
router
  .route('/delete-account', authenticate)
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(ctrlUsers.deleteAccount)

/**
* @openapi
* /user/connect-account:
*   put:
*     tags:
*      - User
*      - Backend
*     description: link account to an existing user
*     responses:
*       200:
*       description: user linked
*/
router
  .route('/connect-account')
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(ctrlUsers.connectAccount)
  .delete(http.notImplemented)

/**
* @openapi
* /user/disconnect-account:
*   put:
*     tags:
*      - User
*      - Backend
*     description: unlink account to an existing user
*     responses:
*       200:
*       description: user unlinked
*/
router
  .route('/disconnect-account')
  .get(http.notImplemented)
  .post(http.notImplemented)
  .put(ctrlUsers.disconnectAccount)
  .delete(http.notImplemented)

/**
* @openapi
* /user/comments:
*   get:
*     tags:
*      - Comment
*      - Backend
*     description: Get comments in a recipe
*     responses:
*       200:
*       description: Account disconnected
*   post:
*     tags:
*      - Comment
*      - Backend
*     description: Create a comment in a recipe
*     responses:
*       200:
*       description: Account disconnected
*   put:
*     tags:
*      - Comment
*      - Backend
*     description: Modify a comment in a recipe
*     responses:
*       200:
*       description: Account disconnected
*   delete:
*     tags:
*      - Comment
*      - Backend
*     description: Delete a comment in a recipe
*     responses:
*       200:
*       description: Account disconnected
*/
router
  .use(authenticate)
  .route('/comments')
  .get(ctrlComments.getRecipeComments)
  .post(ctrlComments.createComment)
  .put(ctrlComments.putComment) // .put(ctrlComments.putComment)
  .delete(ctrlComments.deleteComment) // .delete(ctrlComments.deleteComment)

/**
* @openapi
* /user/comments/comment-reply:
*   post:
*     tags:
*      - Comment
*      - Backend
*     description: Reply a comment in a recipe
*     responses:
*       200:
*       description: Account disconnected
*/
router.post('/comment-reply', authenticate, ctrlComments.respondeComment)

/**
* @openapi
* /user/stadistics:
*   get:
*     tags:
*      - Admin
*      - Backend
*     description: Get stadistics of the app
*     responses:
*       200:
*       description: Stadistics
*   put:
*     tags:
*      - Admin
*      - Backend
*     description: Put stadistics of the app
*     responses:
*       200:
*       description: Added visit
*/
router
  .get('/statistics', ctrlStadistics.stadistics)
  .put('/statistics', addVisit)
module.exports = router
