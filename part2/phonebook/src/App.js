import { useState, useMemo } from 'react'
// import _debounce from 'lodash/debounce'
import { useDebouncedCallback } from 'use-debounce'
import AddForm from './components/AddForm'

const data =  [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
]

const App = () => {
  const [persons, setPersons] = useState(data)
  const [query, setQuery] = useState('')

  // The Hook lets me debounce the value in the middle of a render method
  const handleDebouncedSearch = useDebouncedCallback((value) => setQuery(value), 400)

  const filteredPersons = useMemo(() =>
    persons.filter(({name}) => name.toLowerCase().includes(query.toLowerCase())),
    [query, persons])

  const addPerson = (newName, newNumber) => {
    let isPersonExists = persons.find(({name}) => name === newName)
    if (isPersonExists) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons([...persons, {name: newName.trim(), number: newNumber.trim()}])
    }
  }

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <input
        type="search"
        placeholder="Find a person by name"
        onChange={({target: {value}}) => handleDebouncedSearch(value)}
      />
      <AddForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(({name, number}) => <li key={name}>Name: {name}, phone: {number}</li>)}
      </ul>
    </div>
  )
}

export default App
