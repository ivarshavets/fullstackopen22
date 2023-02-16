import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const { status, list } = useSelector(({ users }) => users)

  if (status === 'loading') {
    return 'Loading'
  }

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {list.map(({ id, username, name, blogs }) => (
          <tr key={id}>
            <td>
              <Link to={`/users/${id}`}>
                {name} ({username})
              </Link>
            </td>
            <td>{blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersList
