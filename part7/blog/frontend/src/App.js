import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userService from './services/userSorage'
import { fetchBlogsThunkAction } from './reducers/blogsSlice'
import { fetchAllUsersThunk } from './reducers/usersSlice'
import { setUser } from './reducers/authSlice'
import { showFlashMessage } from './reducers/flashMessageSlice'
import LoginForm from './components/LoginForm'
import FlashMessage from './components/FlashMessage'
import BlogsList from './components/BlogsList'
import UsersList from './components/UsersList'
import AddBlog from './components/AddBlog'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ authUser }) => authUser)
  const { error } = useSelector(({ blogs }) => blogs)

  const handleLogout = () => {
    userService.deleteUserFromLocalStorage()
    dispatch(dispatch(setUser(null)))
    dispatch(showFlashMessage('Succeessfully logged out!'))
  }

  useEffect(() => {
    const authenticatedUser = userService.getUserFromLocalStorage()
    if (authenticatedUser) {
      dispatch(setUser(authenticatedUser))
    }
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(fetchBlogsThunkAction())
      dispatch(fetchAllUsersThunk())
    }
  }, [user])

  useEffect(() => {
    if (!!error && error === 'Request failed with status code 401') {
      handleLogout()
    }
  }, [error])

  if (!user) {
    return (
      <div className="container">
        <FlashMessage />
        <h2>Login to application</h2>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <FlashMessage />
      <p>
        Logged in as <strong>{user.name}</strong>&nbsp;
        <button onClick={handleLogout}>Logout</button>
      </p>
      <AddBlog />
      <h2>Blogs</h2>
      <BlogsList />
      <h2>Users</h2>
      <UsersList />
    </div>
  )
}

export default App
