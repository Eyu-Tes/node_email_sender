const express = require('express')

const {showSendEmail} = require('../controllers/index')

const router = express.Router()

// @route   GET /
router.get('/', showSendEmail)

module.exports = router
