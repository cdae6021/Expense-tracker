const express = require('express')
const category = require('../../models/category')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (res, req) => {
    const userId = req.user._id
    Record.find({ userId })
      .lean()
      .sort({ _id: 'asc' })
      .then(records => {
        let totalAmount = 0
        records.forEach(item => {
          totalAmount += item.amount
        })
        return res.render('index', {
          totalAmount, records
        })
      })
})

