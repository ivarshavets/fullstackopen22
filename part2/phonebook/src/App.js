import { useState, useMemo, useEffect } from 'react'
// import _debounce from 'lodash/debounce'
import { useDebouncedCallback } from 'use-debounce'
import axios from 'axios'
import AddForm from './components/AddForm'

const PERSONS_URL = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [query, setQuery] = useState('')

  // The Hook lets me debounce the value in the middle of a render method
  const handleDebouncedSearch = useDebouncedCallback((value) => setQuery(value), 400)

  useEffect(() => {
    axios.get(PERSONS_URL)
    .then(({data}) => setPersons(data))
  }, [])

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
