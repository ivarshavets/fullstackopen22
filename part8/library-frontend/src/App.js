import { useState, useCallback, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Notification from './components/Notification'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { STORAGE_KEY, updateCacheWith } from './utils'
import { ALL_BOOKS, BOOK_ADDED } from './queries.js'


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

  useSubscription(BOOK_ADDED, {
    // When a new book is added, the server sends a notification to the client and onData cb is called
    onData: ({ data }) => {
      console.log(data, data.data.bookAdded)
      const addedBook = data.data.bookAdded
      notify(`a book ${addedBook.title} by ${addedBook.author.name} was added`)
      // // the issues of double records
      // client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
      //   return {
      //     allBooks: allBooks.concat(addedBook),
      //   }
      // })
      updateCacheWith(addedBook,  client.cache)
    }
  })

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
          <div>
            <span>Loged in as <strong></strong></span>
            <button onClick={logout}>logout</button>
            </div>
        </div>
      )}
        {/* <button onClick={navigateTo('login')}>login</button> */}


      <Authors show={page === 'authors'} setError={notify} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} navigateTo={navigateTo} />
    </div>
  )
}

export default App
