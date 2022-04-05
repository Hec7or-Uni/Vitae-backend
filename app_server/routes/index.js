const express = require('express')
const router = express.Router()
const ctrlHome = require('../controllers/index')

/* GET home page. */
router.get('/', ctrlHome.index)

module.exports = router
