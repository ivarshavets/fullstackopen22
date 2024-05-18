import { useQuery } from '@apollo/client'
import { useState, useMemo } from 'react'
import { ALL_BOOKS } from '../queries'

const ALL_GENRES_KEY = 'all'

const Books = ({show}) => {
  const {loading, data} = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(ALL_GENRES_KEY)

  const uniqueGenres = useMemo(() => {
   return [...new Set((data?.allBooks || []).flatMap((book) => book.genres))]
  }, [data])

  const filteredBooks = useMemo(() =>
    genre !== ALL_GENRES_KEY?
      (data?.allBooks || []).filter(({genres}) => genres.includes(genre))
      :
      data?.allBooks
    , [genre, data])

  if (!show) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!loading && !data.allBooks.length) {
    return (
      <div>
        <h2>Books</h2>
        <div>no books</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Books</h2>

      <p>
        <button key={ALL_GENRES_KEY} onClick={() => {setGenre(ALL_GENRES_KEY)}}>{ALL_GENRES_KEY}</button>
        {uniqueGenres.map((item) => (
          <button key={item} onClick={() => {setGenre(item)}}>{item}</button>
        ))}
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
