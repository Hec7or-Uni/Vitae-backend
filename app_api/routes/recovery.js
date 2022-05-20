const express = require('express')
const router = express.Router()
const ctrlRecovery = require('../controllers/recovery')
const ctrlUser = require('../controllers/users')
const http = require('../../lib/http')

router
  .route('/')
  .get(ctrlRecovery.recover)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(http.notImplemented)

router
  .route('/validate')
  .get(ctrlUser.getCredentialsById)
  .post(http.notImplemented)
  .put(http.notImplemented)
  .delete(http.notImplemented)

module.exports = router
