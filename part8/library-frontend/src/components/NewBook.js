import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { updateCacheWith } from '../utils'

const NewBook = ({show, setError, navigateTo}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    // // re-fetching queries every time whenever a new book is created
    // // the drawback: the query is always rerun with any updates
    // refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
    onCompleted: () => {
      setError('Successfully added')
      navigateTo('books')
    },
    onError: (error) => {
      console.log(error)
      const errors = error.graphQLErrors
      //const errors = error.graphQLErrors[0].extensions.error.errors
      const messages = Object.values(errors).map(e => e.message).join('\n')
      setError(messages, 'error')
    },
    // update: (cache, response) => {
    //   cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    //     const addedBook = response.data.addBook
    //     return {
    //       allBooks: allBooks.concat(addedBook),
    //     }
    //   })
    // },
    update: (cache, response) => {
      const addedBook = response.data.addBook
      updateCacheWith(addedBook, cache)
    },
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    // The query variables receive values when the query is made
    createBook({ variables: {title, author, published: Number(published), genres} })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
