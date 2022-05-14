const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc')
require('./app_api/models/db')

const routes = './app_api/routes/'
const usersRouter = require(routes + 'users')
const apiRoutes = require(routes + 'index')
const authRoutes = require(routes + 'auth')
const recipeRoutes = require(routes + 'recipes')

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
// Routes
app.use('/auth', authRoutes)
app.use('/', apiRoutes)
app.use('/users', usersRouter)
app.use('/recipes', recipeRoutes)
module.exports = app
