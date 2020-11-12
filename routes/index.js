const express = require('express')

const {showSendEmail, sendEmail} = require('../controllers/index')

const router = express.Router()

// @route   /
router.route('/')
.get(showSendEmail)    // GET
.post(sendEmail)       // POSt

module.exports = router
