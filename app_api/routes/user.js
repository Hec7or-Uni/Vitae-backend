const express = require('express')
const router = express.Router()
const ctrlUsers = require('../controllers/users')

router.post('/signin', ctrlUsers.getCredentials)
router.post('/signup', ctrlUsers.createAccount)
router.put('/update-account', ctrlUsers.updateAccount)
router.get('/', ctrlUsers.getUser)
router.delete('/delete-account', ctrlUsers.deleteAccount)
router.put('/connect-account', ctrlUsers.connectAccount)
// -----
router.get('/storage', ctrlUsers.getStorage)
router.get('/menu', ctrlUsers.getMenu)
router.get('/addWeight', ctrlUsers.addWeight)
router.get('/addStorage', ctrlUsers.addStorage)
router.get('/modify', ctrlUsers.modify)

module.exports = router
