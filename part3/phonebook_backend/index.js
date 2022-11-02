require('dotenv').config() // get environment variables defined in the .env file
const express = require('express')
const app = express()
const morgan = require('morgan') // HTTP request logger middleware for node.js
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())
app.use(express.static('build')) // make express show static content
app.use(express.json()) // function parses incoming requests with JSON payloads

morgan.token('body',  (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (_request, response) => {
  response.send('<h1>Phonebook. Visit /api/persons to see people.</h1>')
})

app.get('/api/persons', (_request, response, next) => {
  Person.find({}).then(result => {
    // When the response is sent in the JSON format,
    // the mongoose toJSON method of each object in the array is called automatically by the JSON.stringify method.
    response.json(result) // sends a JSON response
  }).catch(error => next(error))
})

app.get('/info', async (_request, response) => {
  const datestamp = new Date
  const peopleCount = await Person.count()
  const infoText = peopleCount
    ? `Phonebook has info for ${peopleCount}`
    : 'Phonebook is empty'

  const body = `
      <p>${infoText}</p>
      <p>${datestamp}</p>
    `
  response.send(body)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).send('The person is not found')
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.patch('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const id = request.params.id

  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  const person = new Person({ name, number })

  person.save()
    .then(result => response.json(result))
    .catch(error => next(error))
})

// handler of requests with unknown endpoint
// responds to all requests with 404, no routes or middleware will be called after the response has been sent by unknown endpoint middleware, excepr errorHandler.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// handler of requests with result to errors
// Default Express error handler - middleware, accepts next function as a param and passes an error to it. 
const errorHandler = (error, _request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// the last loaded middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
