var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

var app = express()

app.use(cors())
app.options('*', cors()) // allows preflight for POST, PUT, DELETE

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// var router = express.Router()

app.use('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})
module.exports = app
