import { useState, useMemo, useEffect, useCallback } from 'react'
// import _debounce from 'lodash/debounce'
import { useDebouncedCallback } from 'use-debounce'
import personsService from './services/persons'
import AddForm from './components/AddForm'
import Person from './components/Person'
import FlashMessage from './components/FlashMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [query, setQuery] = useState('')
  const [message, setFlashMessage] = useState(null)

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
            showFlashMessage('Updated successfully!')
          })
          .catch(e => {
            showFlashMessage(`Something went wrong. Error: ${e.response.data.error}`)
            console.log(e)
          })
      }
    } else {
      personsService.addPerson(person)
        .then(({data: {name, number}}) => {
          setPersons([...persons, {name, number}])
          showFlashMessage('Added successfully!')
        })
        .catch(e => {
          showFlashMessage(`Something went wrong. Error: ${e.response.data.error}`)
          console.log(e)
        })
    }
  }

  const handleDeletePerson = (id) => setPersons(persons.filter(person => person.id !== id))

  const showFlashMessage = useCallback((text, type = 'success') => {
    setFlashMessage({text, type})
    setTimeout(() => {
      setFlashMessage(null)
    }, 5000)
  }, [])


  return (
    <div className="container">
      <FlashMessage message={message}/>
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
          <Person key={person.name} item={person} onDelete={handleDeletePerson} showNotification={showFlashMessage}/>
        ))}
      </ul>
    </div>
  )
}

export default App
