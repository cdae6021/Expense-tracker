const Category = require('../category')
const db = require('../../config/mongoose')
const categorySeed = require('./categories.json').categories

db.once('open', () => {
})