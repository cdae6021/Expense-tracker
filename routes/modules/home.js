const express = require('express')
const category = require('../../models/category')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
   res.render('index')
})

module.exports = router