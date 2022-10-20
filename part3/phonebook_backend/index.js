require('dotenv').config() // get environment variables defined in the .env file
const express = require('express') // lib to build a Node backend server
const app = express()
const cors = require('cors') // allow requests from other origins by using Node's cors middleware.
const morgan = require('morgan') // HTTP request logger middleware for node.js
const Person = require('./models/person')

morgan.token('body',  (req) => JSON.stringify(req.body))

app.use(express.json()) // function parses incoming requests with JSON payloads
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build')) // make express show static content

const fetchPeople = () => Person.find({})

// handling requests to the node server, route handlers
app.get('/', (_request, response) => {
  response.send('<h1>Phonebook. Visit /api/persons to see people.</h1>')
})

app.get('/api/persons', (_request, response) => {
  fetchPeople().then(result => {
    // When the response is sent in the JSON format,
    // the toJSON method of each object in the array is called automatically by the JSON.stringify method.
    response.json(result) // sends a JSON response
  })
})

app.get('/info', (_request, response) => {
  fetchPeople().then(people => {
    const infoText = people.length
    ? `Phonebook has info for ${people.length}`
    : 'Phonebook is empty'

    const body = `
      <p>${infoText}</p>
      <p>${Date()}</p>
    `
    response.send(body)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).send("The person is not found")
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).send({error: 'malformatted id'})
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndRemove(id).then(() => response.status(204).end())
})

app.post('/api/persons', (request, response) => {
  const {body: {name, number}} = request
  if (!name || !number) {
    //400 bad request
    return response.status(400).json({
      error: 'The name or number is missing'
    })
  }

  Person.find({name}).then(result => {
    if (!!result.length) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    const person = new Person({
      name,
      number
    })
    person.save().then(result => response.json(result))
  })
})


const PORT = process.env.PORT || 3001
console.log('process.env', process.env, process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
