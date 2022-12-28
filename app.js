const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const errorController = require('./controller/error')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const routes = require('./routes/routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

app.use(errorController.get404)

app.listen(3000)