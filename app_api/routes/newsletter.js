const express = require('express')
const router = express.Router()
const ctrlNewsletter = require('../controllers/newsletter')
const http = require('../../lib/http')

/**
* @openapi
* /api/newsletter:
*   post:
*     description: Suscribe newsletter
*     parameters:
*     - name: email
*       description: email of the user
*       required: true
*       type: String
*     responses:
*       204:
*       description: Suscribed
*   delete:
*     description: Unsuscribe newsletter
*     parameters:
*     - name: email
*       description: email of the user
*       required: true
*       type: String
*     responses:
*       204:
*       description: Unsuscribed
*/
router
  .route('/')
  .get(http.notImplemented)
  .post(ctrlNewsletter.subscribe)
  .put(http.notImplemented)
  .delete(ctrlNewsletter.unSubscribe)

module.exports = router
