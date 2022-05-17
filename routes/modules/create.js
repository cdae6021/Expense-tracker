const express = require('express')
const category = require('../../models/category')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
    Category.find()
    .lean()
    .then(categoies => res.render('create-record', { categoies }))
    .catch(err => console.error(err))
})



module.exports = router