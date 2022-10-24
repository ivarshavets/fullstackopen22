
const app = require('./app')
const { PORT } = require('./utils/config')
const logger = require('./utils/logger')

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})


// const http = require('http')
// const server = http.createServer(app)

// server.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`)
// })
