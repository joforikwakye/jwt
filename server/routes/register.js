const express = require('express')
const router = express.Router()
const handleCreateNewUser = require('../controllers/registerController')

router.post('/', handleCreateNewUser.handleCreateNewUser)

module.exports = router