import { useSelector } from 'react-redux'

const User = () => {
  const { status } = useSelector(({ users }) => users)

  if (status === 'loading') {
    return 'Loading'
  }

  return <h2>User page</h2>
}

export default User
