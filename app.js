require('./app_api/models/db')
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')
const routes = './app_api/routes/'
const apiRoutes = require(routes + 'index')
const usersRouter = require(routes + 'user')
const recipeRoutes = require(routes + 'inventory')

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

const options = {
  swaggerDefinition: swaggerDefinition, // import swaggerDefinitions
  apis: ['./app_api/routes/*.js'] // path to the API docs
}

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)

// Express App
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.set('base', '/api')
app.use('/api/', apiRoutes)
app.use('/api/user', usersRouter)
app.use('/api/inventory', recipeRoutes)
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

module.exports = app
