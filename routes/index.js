const express = require('express')
const router = express.Router()

const create = require('./modules/create')
const users = require('./modules/users')
const home = require('./modules/home')

router.use('/users', users)
router.use('/create', create)
router.use('/', home)

module.exports = router