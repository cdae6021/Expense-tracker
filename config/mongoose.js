const mongoose = require('mongoose') // 載入 mongoose

const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

db.on('error', () => {
    console.log('mongoDB error!')
})

db.once('open', () => {
    console.log('mongoDB connected!')
})

module.exports = db