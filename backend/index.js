const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

const port = config.port || 3003
server.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})