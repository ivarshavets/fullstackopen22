const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
// const middleware = require('./utils/middleware')

const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


morgan.token('body',  (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

module.exports = app
