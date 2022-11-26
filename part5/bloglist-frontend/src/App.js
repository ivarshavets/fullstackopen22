import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/user'
import LoginForm from './components/LoginForm'
import FlashMessage from './components/FlashMessage'
import AddBlog from './components/AddBlog'
// import AddBlogWithTogglable from './components/AddBlogWithTogglable'

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
        showFlashMessage(e.response.data.error, 'error')
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('authenticatedUser')
    setUser(null)
    userService.setToken(null)
    showFlashMessage('Succeessfully logged out!')
  }

  const getSortedBlogs = useCallback((blogs) =>
  blogs.sort((a, b) => a.likes - b.likes)
, [blogs])

  const addBlog = (blog) => {
    return blogService.postBlog(blog)
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

  const updateBlog = (payload, id) => {
    blogService.patchBlog(payload, id)
      .then(data => {
        const updatedBlogList = blogs.map(blog => {
          if (blog.id === id) {
            return {
              ...blog,
              ...data
            }
          }
          return blog
        })
        setBlogs(getSortedBlogs(updatedBlogList))
        showFlashMessage('You liked the blog successfully')
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
      blogService.fetchBlogs().then(blogs => {
        setBlogs(getSortedBlogs(blogs))
      }
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
      <AddBlog addBlog={addBlog} />
      {/* <AddBlogWithTogglable addBlog={addBlog} /> */}
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
      )}
    </div>
  )
}

export default App
