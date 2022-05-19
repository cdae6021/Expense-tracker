const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') 
const session = require('express-session')

const routes = require('./routes')
require('./config/mongoose')
const usePassport = require('./config/passport')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
  }))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

usePassport(app)
app.use(routes)

app.listen(3000, () => {
    console.log('app is listen at http://localhost:3000')
})