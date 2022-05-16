const express = require('express')
const router = express.Router()
const ctrlUsers = require('../controllers/users')
const passport = require('passport')

router.get('/', passport.authenticate('jwt', { session: false }), ctrlUsers.getUser)
router.get('/storage', passport.authenticate('jwt', { session: false }), ctrlUsers.getStorage)
router.get('/menu', passport.authenticate('jwt', { session: false }), ctrlUsers.getMenu)
router.get('/addWeight', passport.authenticate('jwt', { session: false }), ctrlUsers.addWeight)
router.get('/addStorage', passport.authenticate('jwt', { session: false }), ctrlUsers.addStorage)
router.get('/modify', passport.authenticate('jwt', { session: false }), ctrlUsers.modify)
module.exports = router
