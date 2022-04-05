const express = require('express')
const router = express.Router()
const ctrlHome = require('../controllers/index')

/* GET home page. */
/**
* @openapi
* /:
*   get:
*     description: Welcome to this example!
*     responses:
*       200:
*         description: Returns a simple message ;)
*/
router.get('/', ctrlHome.index)

/* POST home page. */
/**
* @openapi
* /:
*   post:
*     description: Welcome to this example!
*     responses:
*       200:
*         description: Give a simple message ;)
*/
router.post('/', ctrlHome.index)

module.exports = router
