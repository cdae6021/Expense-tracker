const express = require('express')
const router = express.Router()

const records = require('./modules/records')
const users = require('./modules/users')
const home = require('./modules/home')
const auth = require('./modules/auth')
const sort = require('./modules/sort')

const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/sort', authenticator, sort)
router.use('/records', authenticator, records)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router