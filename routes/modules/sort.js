const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


router.get('/:sort', (req, res) => {
    const userId = req.user._id
    const sort = req.params.sort
    
    Record.find({ userId })
      .populate('categoryId')
      .lean()
      .then(records => {
        let totalAmount = 0
        const result = []
        if (sort === '全部') {
          records.forEach(record => {
            totalAmount += record.amount         
          })      
          return res.render('index', { records, totalAmount, sort })
        } else {
          records.forEach(record  => {
            if (record.categoryId.name === sort){
              result.push(record)
              
              result.forEach(result => {
              totalAmount += result.amount
              })
            }
          })
          return res.render('index', {records: result, totalAmount, sort})
        }
      })
      .catch(error => {
        console.log(error)
        res.render('errorPage', { error: error.message })
      })
    
  })
  
  module.exports = router