const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
    name:{
      type: String,
      required: true
    },
    date:{
      type: Date,
      default: Date.now
    },
    amount:{
      type: Number,
      required: true
    },
    userId:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true
    },
    categoryId:{
      type: Schema.Types.ObjectId,
      ref: 'Category',
      index: true
    }
  })

  module.exports = mongoose.model('Record', recordSchema)