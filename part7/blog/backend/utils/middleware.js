const jwt = require('jsonwebtoken')
const User = require('../models/user')
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

const userExtractor = async (request, response, next) => {
  const { token } = request

  // checking of the validity of the token
  // decoding the token and returning the Object which the token was based on
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const { id } = decodedToken

  if (!id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(id)

  if (!user) {
    return response.status(400).json({ error: 'user with the given id cannot be found' })
  }

  request.user = user
  next()
}

// handler of requests with unknown endpoint
// responds to all requests with 404, no routes or middleware will be called after the response has been sent by unknown endpoint middleware, excepr errorHandler.
const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Default Express error handler: accepts next function as a param and passes an error to it.
// If next was called without a parameter, then the execution would simply move onto the next route or middleware. If the next function is called with a parameter, then the execution will continue to the error handler middleware.
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
  userExtractor,
  unknownEndpoint,
  errorHandler
}
