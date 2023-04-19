import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import AuthorBirthYearForm from './AuthorBirthYearForm'

const Authors = ({show, setError}) => {
  const {loading, data} = useQuery(ALL_AUTHORS, {
    // pollInterval: 2000, //executing the query with an interval in 2000 ms
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (!show) {
    return null
  }

  if (!loading && !data.allAuthors.length) {
    return (
      <div>
        <h2>Authors</h2>
        <div>no authors</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorBirthYearForm authors={data.allAuthors} setError={setError} />
    </div>
  )
}

export default Authors
