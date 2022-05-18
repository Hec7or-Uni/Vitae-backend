const express = require('express')
const router = express.Router()
const ctrlUsers = require('../controllers/users')

router.route('/user')
  .get('/', ctrlUsers.getUser)
  .get('/storage', ctrlUsers.getStorage)
  .get('/menu', ctrlUsers.getMenu)
  .get('/addWeight', ctrlUsers.addWeight)
  .get('/addStorage', ctrlUsers.addStorage)
  .get('/modify', ctrlUsers.modify)

module.exports = router
