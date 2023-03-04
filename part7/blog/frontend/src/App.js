import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import userService from './services/userSorage'
import { fetchBlogsThunkAction } from './reducers/blogsSlice'
import { fetchAllUsersThunk } from './reducers/usersSlice'
import { setUser } from './reducers/authSlice'
import { showFlashMessage } from './reducers/flashMessageSlice'
import Navigation from './components/Navigation'
import Login from './components/Login'
import FlashMessage from './components/FlashMessage'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'
import UsersList from './components/UsersList'
import User from './components/User'
import AddBlog from './components/AddBlog'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ authUser }) => authUser)
  const { list, error } = useSelector(({ blogs }) => blogs)

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
    if (user && !list.length) {
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
    return <Login />
  }

  return (
    <div>
      <FlashMessage />
      <Navigation />
      <Container sx={{ mt: 2, mb: 2 }}>
        <Box sx={{ mb: 2 }}>
          <AddBlog />
        </Box>
        <Card>
          <CardContent>
            <Routes>
              <Route index element={<BlogsList />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default App
