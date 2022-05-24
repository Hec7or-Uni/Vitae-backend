const express = require('express')
const router = express.Router()
const ctrlRecovery = require('../controllers/recovery')
const ctrlUser = require('../controllers/users')
const http = require('../../lib/http')

/**
* @openapi
* /api/inventory/recovery:
*   get:
*     description: Return random recipes
*     consumes:
*     - "application/json"
*     produces:
*     - "application/json"
*     parameters:
*     - in: "body"
*       name: "body"
*       description: "Pet object that needs to be added to the store"
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
* /api/inventory/recovery/validate:
*   get:
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
