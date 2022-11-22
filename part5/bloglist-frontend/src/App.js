import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/user'
import LoginForm from './components/LoginForm'
import FlashMessage from './components/FlashMessage'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setFlashMessage] = useState(null)

  const showFlashMessage = (text, type='success') => {
    setFlashMessage({text, type})
    setTimeout(() => {
      setFlashMessage(null)
    }, 5000)
  }

  const handleLogin = (credentials) => {
    userService.loginRequest(credentials)
      .then(({data}) => {
        setUser(data)
        userService.setToken(data.token)
        window.localStorage.setItem('authenticatedUser', JSON.stringify(data))
        showFlashMessage('Succeessfully login!')
      })
      .catch(e => {
        console.log(e.response.data.error)
        showFlashMessage(e.response.data.error, 'error')
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('authenticatedUser')
    setUser(null)
    userService.setToken(null)
    showFlashMessage('Succeessfully logged out!')
  }

  const addBlog = (blog) => {
    blogService.postBlog(blog)
      .then((data) => {
        setBlogs(() => ([
          ...blogs,
          data
        ]))
        showFlashMessage('Blog is added successfully')
      })
      .catch(e => {
        showFlashMessage(e.response.data.error, 'error')
      })
  }

  useEffect(() => {
    const authenticatedUser = window.localStorage.getItem('authenticatedUser')
    if (authenticatedUser) {
      const parsedUser = JSON.parse(authenticatedUser)
      setUser(parsedUser)
      userService.setToken(parsedUser.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.fetchBlogs().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  if (!user) {
    return (
      <div className="container">
        <FlashMessage message={message} />
        <h2>Login to application</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }
  return (
    <div className="container">
      <FlashMessage message={message} />
      <p>
        Logged in as <strong>{user.name}</strong>&nbsp;
        <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>Add a new blog</h2>
      <AddBlogForm addBlog={addBlog} />
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
