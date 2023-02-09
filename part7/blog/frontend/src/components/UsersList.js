import { useSelector } from 'react-redux'

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
              <a href={`/users/${id}`}>
                {name} ({username})
              </a>
            </td>
            <td>{blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersList
