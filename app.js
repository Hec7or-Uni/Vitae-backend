const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc')

const routes = './app_server/routes/'

const indexRouter = require(routes + 'index')
const usersRouter = require(routes + 'users')

const app = express()
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'API de gestión de usuarios',
    version: '1.0.0',
    description: 'Descripción del API del servicio de usuarios'
  },
  host: 'localhost:3000',
  basePath: '/api/',
  schemes: ['http']
}
// options for the swagger docs
const options = {
// import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./app_server/routes/*.js']
}
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)
// serve swagger
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/', indexRouter)
app.use('/api/users', usersRouter)

module.exports = app
