import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({show}) => {
  const {loading, data} = useQuery(ALL_BOOKS)

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

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
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
