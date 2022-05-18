const express = require('express')
const router = express.Router()
const ctrlUsers = require('../controllers/users')

router.get('/', ctrlUsers.getUser)
router.get('/storage', ctrlUsers.getStorage)
router.get('/menu', ctrlUsers.getMenu)
router.get('/addWeight', ctrlUsers.addWeight)
router.get('/addStorage', ctrlUsers.addStorage)
router.get('/modify', ctrlUsers.modify)

module.exports = router
