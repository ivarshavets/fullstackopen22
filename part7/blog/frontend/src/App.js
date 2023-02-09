import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userService from './services/user'
import { fetchBlogsThunkAction } from './reducers/blogsSlice'
import { setUser } from './reducers/userSlice'
import { showFlashMessage } from './reducers/flashMessageSlice'
import LoginForm from './components/LoginForm'
import FlashMessage from './components/FlashMessage'
import BlogsList from './components/BlogsList'
import AddBlog from './components/AddBlog'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user)
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
    </div>
  )
}

export default App
