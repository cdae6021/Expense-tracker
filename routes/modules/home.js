const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
   const userId = req.user._id   // 變數設定
   Record.find({ userId })         // 加入查詢條件
     .lean()
     .sort({ _id: 'asc' })
     .then(records => res.render('index', { records }))
     .catch(error => console.error(error))
 })

module.exports = router