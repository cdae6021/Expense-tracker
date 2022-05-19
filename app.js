const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') 
const session = require('express-session')
const flash = require('connect-flash')

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
app.use(flash())
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
    next()
  })
app.use(routes)

app.listen(3000, () => {
    console.log('app is listen at http://localhost:3000')
})