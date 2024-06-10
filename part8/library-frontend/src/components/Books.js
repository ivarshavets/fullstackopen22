import { useQuery } from '@apollo/client'
import { useState, useMemo } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({show}) => {
  const [genre, setGenre] = useState(null)

  const {loading, data} = useQuery(ALL_BOOKS, {
    variables: { genre: null }
  })

  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
    //pollInterval: 2000
  })

  // Filtering with React
  // const uniqueGenres = useMemo(() => {
  //  return [...new Set((data?.allBooks || []).flatMap((book) => book.genres))]
  // }, [data])

  // const filteredBooks = useMemo(() =>
  //   genre !== ALL_GENRES_KEY || !genre ?
  //     (data?.allBooks || []).filter(({genres}) => genres.includes(genre))
  //     :
  //     data?.allBooks
  //   , [genre, data])

  const uniqueGenres = useMemo(
    () => [...new Set((data?.allBooks||[]).reduce((s, b) => s.concat(b.genres), []))]
    , [data])

  if (!show) {
    return null
  }

  if (loading || filteredBooks.loading) {
    return <div>Loading...</div>
  }

  if (!loading && !data?.allBooks.length) {
    return (
      <div>
        <h2>Books</h2>
        <div>no books</div>
      </div>
    )
  }

  const allBooks = data.allBooks
  const books = genre ? filteredBooks.data.allBooks : allBooks

  return (
    <div>
      <h2>Books</h2>

      <p>
        <button onClick={() => setGenre(null)}>{!genre ? <strong>all</strong> : 'all'}</button>
        {uniqueGenres.map((el) => (
          <button key={el} onClick={() => {setGenre(el)}}>
            {el === genre ? <strong>{el}</strong> : el}
          </button>
        ))}
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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
