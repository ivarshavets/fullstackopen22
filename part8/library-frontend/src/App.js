import { useState, useCallback, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Notification from './components/Notification'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { STORAGE_KEY } from './utils'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [flashMessage, setFlashMessage] = useState(null)
  const client = useApolloClient()

  const notify = useCallback((text, type = 'success') => {
    setFlashMessage({text, type})
    setTimeout(() => {
      setFlashMessage(null)
    }, 10000)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const navigateTo = (page) =>
    () => setPage(page)

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY)
    if (token) {
      setToken(token)
    }
  }, [])

  if (!token) {
    return (
      <div>
        <Notification message={flashMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
          navigateTo={navigateTo}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification message={flashMessage} />
      {token &&(
        <div>
          <button onClick={navigateTo('authors')}>authors</button>
          <button onClick={navigateTo('books')}>books</button>
          <button onClick={navigateTo('add')}>add book</button>
          <button onClick={logout}>logout</button>
        </div>
      )}
        {/* <button onClick={navigateTo('login')}>login</button> */}


      <Authors show={page === 'authors'} setError={notify} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} />
    </div>
  )
}

export default App
