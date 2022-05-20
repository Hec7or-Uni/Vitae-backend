const express = require('express')
const router = express.Router()
const ctrlRecovery = require('../controllers/recovery')
const ctrlUser = require('../controllers/users')
const http = require('../../lib/http')

router
  .route('/')
  .get(ctrlRecovery.recover)
  .post(http.getUser)
  .put(http.getUser)
  .delete(http.getUser)

router
  .route('/validate')
  .get(ctrlUser.getCredentialsById)
  .post(http.getUser)
  .put(http.getUser)
  .delete(http.getUser)

module.exports = router
