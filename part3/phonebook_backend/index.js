let people = [
  {
    "id": 1,
    "name": "Arto Hellas!",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan') // HTTP request logger middleware for node.js

morgan.token('body',  (req) => JSON.stringify(req.body))

app.use(express.json()) // funcion parses incoming requests with JSON payloads
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  response.send('<h1>Phonebook. Visit /api/persons to see people.</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(people) // sends a JSON response
})

app.get('/info', (request, response) => {
  const infoText = people.length
    ? `Phonebook has info for ${people.length}`
    : 'Phonebook is empty'

  const body = `
    <p>${infoText}</p>
    <p>${Date()}</p>
  `
  response.send(body)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = people.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).send("The person is not found")
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(person => person.id !== id)
  response.status(204).end()
})


const getRandomInt = (max) => Math.floor(Math.random() * max)

app.post('/api/persons', (request, response) => {
  const {body: {name, number}} = request
  if (!name || !number) {
    //400 bad request
    return response.status(400).json({
      error: 'The name or number is missing'
    })
  }

  if (people.find(person => person.name === name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const id = getRandomInt(people.length)
  const person = {
    id,
    name,
    number
  }

  people.concat(person)
  response.json(person)
})


const PORT = process.env.PORT || 3001
console.log('process.env', process.env, process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
