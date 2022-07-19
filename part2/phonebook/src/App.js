import { useState, useMemo, useEffect } from 'react'
// import _debounce from 'lodash/debounce'
import { useDebouncedCallback } from 'use-debounce'
import personsService from './services/persons'
import AddForm from './components/AddForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [query, setQuery] = useState('')

  // The Hook lets me debounce the value in the middle of a render method
  const handleDebouncedSearch = useDebouncedCallback((value) => setQuery(value), 400)

  useEffect(() => {
    personsService.getPersons().then(({data}) => setPersons(data))
  }, [])

  const filteredPersons = useMemo(() =>
    (persons || []).filter(({name}) => name.toLowerCase().includes(query.toLowerCase())),
    [query, persons])

  const addPerson = (person) => {
    const personToBeAdded = persons.find(({name}) => name === person.name)
    const isPersonExists = !!personToBeAdded && Object.keys(personToBeAdded).length !== 0

    if (isPersonExists) {
      if (window.confirm(`${person.name} is already added to the phonebook. Replace the old number with the new one?`)) {
        personsService.updatePerson(personToBeAdded.id, {number: person.number})
          .then(({data}) =>  {
            const updatedList = persons.map(el => el.id === data.id ? {...el, ...data} : el)
            setPersons(updatedList)
          })
          .catch(e => console.log(e))
      }
    } else {
      personsService.addPerson(person)
        .then(({data: {name, number}}) => setPersons([...persons, {name, number}]))
        .catch(e => console.log(e))
    }
  }

  const handleDeletePerson = (id) => setPersons(persons.filter(person => person.id !== id))

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
        {(filteredPersons || []).map((person) => (
          <Person key={person.name} item={person} onDelete={handleDeletePerson} />
        ))}
      </ul>
    </div>
  )
}

export default App
