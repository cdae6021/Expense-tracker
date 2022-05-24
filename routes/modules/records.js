const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


//瀏覽新增頁面
router.get('/create', (req, res) => {
     Category.find({})
       .lean()
       .then(catagories => {
         return res.render('create-records', { catagories })
       })
       .catch(error => {
         console.log(error)
         res.render('errorPage', { error: error.message })
       })
   })

//瀏覽編輯頁面
router.get('/edit/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
    Category.find({})
      .lean()
      .then(catagories => {
        Record.findOne({ _id, userId })
        .populate('categoryId')
        .lean()
        .then(record => {      
          return res.render('edit-records', { catagories, record })
        })    
    })
    .catch(error => {
      res.render('errorPage', { error: error.message })
    })
})

//發送編輯請求
router.put('/edit/:id',(req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body
  Record.findOne({_id, userId})
  .then(record => {
    record.name = name
    record.date = date
    record.amount = amount
    record.categoryId = categoryId
    return record.save()
  })
  .then(() => res.redirect('/'))
  .catch(error => {
    res.render('errorPage', { error: error.message })
  })
})

//發送新增請求
router.post('/create', (req, res) => {
     const userId = req.user._id
     const {name, date, categoryId, amount} = req.body
     let errors = []
     if (!name || !date || !categoryId || !amount) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (errors.length) {
      return Category.find({})
      .lean()
      .then(catagories => {
        res.render('create-records', { 
          catagories,
          errors,
          name,
          date,
          categoryId,
          amount
        })
      })
    }
     return Record.create({
          name, date, categoryId, amount, userId
          })
          .then(() => res.redirect('/'))
          .catch(error => {
            console.log(error)
            res.render('errorPage', { error: error.message })
          })      
})

//發送刪除請求
router.delete('/delete/:id', (req, res) => {
     const userId = req.user._id
     const _id = req.params.id
     return Record.findOne({ _id, userId })
       .then(record => {
         record.remove()
       })
       .then(() => res.redirect("/"))
       .catch(error => {
         console.log(error)
         res.render('errorPage', { error: error.message })
       })
   })


module.exports = router