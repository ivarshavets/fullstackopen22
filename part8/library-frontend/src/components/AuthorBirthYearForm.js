import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorBirthYearForm = ({authors, setError}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    if (result.data && result.data.name === null) {
      setError('author not found')
    }
  }, [result.data, setError])

  const handleEditAuthor = async (event) => {
    event.preventDefault()
    editAuthor({ variables: {name, born: Number(born)}})
    setName('')
    setBorn(0)
  }

  return (
    <div>
      <h3>Set birth year</h3>

      <form onSubmit={handleEditAuthor}>
        <select
          value={name}
          onChange={({ target }) => setName(target.value)}>
          {authors.map(({id, name}) =>
            <option key={id} value={name}>
              {name}
            </option>
          )}
        </select>
        <input
          value={born} type='number'
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorBirthYearForm
