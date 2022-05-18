const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const routes = require('./routes')


app.use(routes)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')



app.listen(3000, () => {
    console.log('app is listen at http://localhost:3000')
})