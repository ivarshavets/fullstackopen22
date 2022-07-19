import { useState } from 'react'

const AddForm = ({addPerson}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = ({target: {value}}) => setNewName(value)
  const handlePhoneChange = ({target: {value}}) => setNewNumber(value)

  const submitForm = (e) => {
    e.preventDefault()
    addPerson({name: newName,  number: newNumber})
    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        Name: <input type="text" value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        Number: <input type="phone" value={newNumber} onChange={handlePhoneChange}/>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default AddForm
