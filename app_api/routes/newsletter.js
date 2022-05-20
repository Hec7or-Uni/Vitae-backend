const express = require('express')
const router = express.Router()
const ctrlNewsletter = require('../controllers/newsletter')
const http = require('../../lib/http')

router
  .route('/')
  .get(http.notImplemented)
  .post(ctrlNewsletter.subscribe)
  .put(ctrlNewsletter.unSubscribe)
  .delete(http.notImplemented)

module.exports = router
