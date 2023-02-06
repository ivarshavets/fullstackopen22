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
  const { blogs: error } = useSelector(({ blogs }) => blogs)

  const handleLogin = (credentials) => {
    userService
      .loginRequest(credentials)
      .then(({ data }) => {
        dispatch(setUser(data))
        userService.setToken(data.token)
        window.localStorage.setItem('authenticatedUser', JSON.stringify(data))
        dispatch(showFlashMessage('Succeessfully logged in!'))
      })
      .catch((e) => {
        dispatch(showFlashMessage(e.response.data.error, 'error'))
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('authenticatedUser')
    dispatch(dispatch(setUser(null)))
    userService.setToken(null)
    dispatch(showFlashMessage('Succeessfully logged out!'))
  }

  useEffect(() => {
    const authenticatedUser = window.localStorage.getItem('authenticatedUser')
    if (authenticatedUser) {
      const parsedUser = JSON.parse(authenticatedUser)
      dispatch(setUser(parsedUser))
      userService.setToken(parsedUser.token)
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
        <LoginForm handleLogin={handleLogin} />
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
