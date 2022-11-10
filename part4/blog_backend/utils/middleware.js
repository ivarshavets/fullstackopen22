const logger = require('./logger')

// a normal middleware is a function with three parameters,
// that at the end calls the last parameter next
// in order to move the control to next middleware

// get JWT, sent in the Authorization header using the Bearer schema
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  request.token = authorization?.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null

  next()
}


// handler of requests with unknown endpoint
// responds to all requests with 404, no routes or middleware will be called after the response has been sent by unknown endpoint middleware, excepr errorHandler.
const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Default Express error handler: accepts next function as a param and passes an error to it.
const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'id format is incorrect' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: ' invalid token or jwt must be provided'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}
