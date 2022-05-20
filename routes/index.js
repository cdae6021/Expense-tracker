const express = require('express')
const router = express.Router()

const create = require('./modules/create')
const users = require('./modules/users')
const home = require('./modules/home')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/create', authenticator, create)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router