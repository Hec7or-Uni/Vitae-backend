require('./app_api/models/db')
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const cors = require('cors')
const path = require('path')
const routes = './app_api/routes/'
const { authenticate } = require('./lib/auth')
const usersRouter = require(routes + 'user')
const recipeRoutes = require(routes + 'inventory')
const newsletterRouter = require(routes + 'newsletter')
const recoveryRoutes = require(routes + 'recovery')

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

const allowedOrigins = ['http://localhost:3000', 'http://localhost:4000']

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  }
}))

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.set('base', '/api')
app.use('/api/user', usersRouter)
app.use('/api/inventory', authenticate, recipeRoutes)
app.use('/api/newsletter', newsletterRouter)
app.use('/api/recovery', recoveryRoutes)
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

module.exports = app
