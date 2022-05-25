const express = require('express')
const router = express.Router()
const ctrlRecovery = require('../controllers/recovery')
const ctrlUser = require('../controllers/users')
const http = require('../../lib/http')

/**
* @openapi
* /user/recovery:
*   get:
*     tags:
*      - User
*      - Backend
*     description: Return random recipes
*     consumes:
*     - "application/json"
*     produces:
*     - "application/json"
*     parameters:
*     - in: "body"
*       name: "body"
*       required: true
*     responses:
*       200:
*       description: Returns a json with N recipes
*     security:
*       OAuth2: [admin]
*/
router
  .route('/')
  .get(ctrlRecovery.recover)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(http.notImplemented)

/**
* @openapi
* /user/recovery/validate:
*   get:
*     tags:
*      - User
*      - Backend
*     description: Return random recipes
*     responses:
*       200:
*       description: Returns a json with N recipes
*/
router
  .route('/validate')
  .get(ctrlUser.getCredentialsById)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(http.notImplemented)

module.exports = router
