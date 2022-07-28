const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const forumRouter = require('./controllers/forums')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/forums', forumRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

module.exports = app