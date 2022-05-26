const express = require('express')
const router = express.Router()
const ctrlNewsletter = require('../controllers/newsletter')
const http = require('../../lib/http')

/**
* @openapi
* /newsletter:
*   post:
*     tags:
*      - Newsletter
*      - Backend
*     description: Suscribe newsletter
*     security:
*       OAuth2: [user]
*     parameters:
*     - name: email
*       description: email of the user
*       required: true
*       type: String
*     responses:
*       204:
*       description: Suscribed
*   delete:
*     tags:
*      - Newsletter
*      - Backend
*     security:
*       OAuth2: [user]
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
