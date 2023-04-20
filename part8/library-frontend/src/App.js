import { useState, useCallback } from 'react'
import Notification from './components/Notification'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [flashMessage, setFlashMessage] = useState(null)

  const notify = useCallback((text, type = 'success') => {
    setFlashMessage({text, type})
    setTimeout(() => {
      setFlashMessage(null)
    }, 10000)
  }, [])

  return (
    <div>
      <Notification message={flashMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} setError={notify} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} />
    </div>
  )
}

export default App
