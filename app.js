require('./app_api/models/db')
const express = require('express')
const cookieParser = require('cookie-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const cors = require('cors')
const path = require('path')
const routes = './app_api/routes/'
const usersRouter = require(routes + 'user')
const inventoryRoutes = require(routes + 'inventory')
const newsletterRouter = require(routes + 'newsletter')
const recoveryRoutes = require(routes + 'recovery')

// const swaggerDefinition = {
//   info: {
//     title: 'API de Vitop',
//     version: '0.0.1',
//     description: 'Descripción de las funciones de la API'
//   },
//   openapi: '3.0.0',
//   host: 'localhost:4000',
//   basePath: '/api/',
//   schemes: ['http']
// }

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Vitop API',
    version: '0.0.2',
    description:
      'This is a REST API application for Vitop by Vitae app.',
    termsOfService: 'https://vitop.xyz/tos/',
    contact: {
      name: 'Contact',
      email: 'hi@vitop.xyz'
    }
  },
  servers: [
    {
      url: 'https://vitop.xyz/api/',
      description: 'Frontend'
    },
    {
      url: 'https://vitop.xyz/api/',
      description: 'Backend'
    }
  ]
}

const options = {
  swaggerDefinition: swaggerDefinition, // import swaggerDefinitions
  // apis: ['./app_api/routes/*.js']
  apis: ['./app_api/routes/*.js', './public/openapi.yaml'] // path to the API docs
}

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)

// Express App
const app = express()

const allowedOrigins = ['http://localhost:3000', 'http://localhost:4000', 'https://vitop.xyz', 'https://www.vitop.xyz', 'vitop.xyzvitae-frontend.vercel.app']

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  }
}))

// app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.set('base', '/api')
app.use('/api/user', usersRouter)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/newsletter', newsletterRouter)
app.use('/api/recovery', recoveryRoutes)
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

module.exports = app
