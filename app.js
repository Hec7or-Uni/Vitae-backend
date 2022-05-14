const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc')
require('./app_api/models/db')
require('./app_api/controllers/auth')
//  const routes = './app_server/routes/'
// const indexRouter = require(routes + 'index')
// const usersRouter = require(routes + 'users')
const apiRoutes = require('./app_api/routes/index')
const authRoutes = require('./app_server/routes/auth')

const app = express()
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'API de Vitop',
    version: '0.0.1',
    description: 'Descripción de las funciones de la API'
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
  apis: ['./app_api/routes/*.js']
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
app.use('/', authRoutes)
app.use('/', apiRoutes)
// app.use('/api/users', usersRouter)

module.exports = app
