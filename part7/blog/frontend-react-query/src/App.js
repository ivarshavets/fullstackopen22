import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { fetchAllUsersThunk } from './reducers/usersSlice'
import { useAuthUser, useInitUser } from './contexts/authUser'
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

  const user = useAuthUser()
  const initUser = useInitUser()

  useEffect(() => {
    initUser()
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(fetchAllUsersThunk())
    }
  }, [user])

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
