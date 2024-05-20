import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({show}) => {
  const user = useQuery(ME)

  //const favoriteGenre = user.data ? user.data.me.favoriteGenre : null
  const favoriteGenre = user.data?.me.favoriteGenre

  const allBooks = useQuery(ALL_BOOKS, {
    variables: { favoriteGenre },
    skip: !favoriteGenre
  })

  if (!show || !user.data || !allBooks.data) {
    return null
  }

  if (user.loading || allBooks.loading) {
    return <div>Loading...</div>
  }

  if (user.error || allBooks.error) {
    return <p>Something went wrong</p>;
  }

  const books = allBooks.data.allBooks

  // done in query
  // const bookRecommendations = allBooks.data.allBooks.filter((b) =>
  //   b.genres.includes(favoriteGenre)
  // );

  return (
    <div>
        <h2>recommendations</h2>
        <div>
            books in <strong>{favoriteGenre}</strong> genre
        </div>
        <table>
            <tbody>
            <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
            </tr>
            {books.map((a) => (
                <tr key={a.id}>
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

export default Recommendations
