import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUserById } from '../reducers/usersSlice'

const User = () => {
  const { id } = useParams()

  // Memoisation to ensure that each component instance gets its own selector instance
  // due to its dependance on the user id.
  // Atalternative memoization - using createCachedSelector of the re-reselect lib
  const selectUserByIdMemoized = useMemo(() => selectUserById, [id])
  const user = useSelector((state) => selectUserByIdMemoized(state, id))

  const { status } = useSelector(({ users }) => users)

  if (status === 'loading') {
    return 'Loading'
  }

  if (!user) return null

  const { name, username, blogs } = user

  return (
    <div>
      <h2>
        {name} ({username})
      </h2>
      <h4>Blogs by the author:</h4>
      <ul>
        {blogs.map(({ id, title }) => (
          <li key={id}>
            <div>{title}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
