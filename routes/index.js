const express = require('express')
const router = express.Router()

const records = require('./modules/create')
const users = require('./modules/users')


router.use('/create', create)

module.exports = router