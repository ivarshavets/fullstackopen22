import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useEffect } from 'react'

import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import userService from '../services/users'
import { useAuthUser } from '../contexts/authUser'

const User = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const authUser = useAuthUser()

  const {
    data: user,
    isLoading,
    isError,
    error
  } = useQuery(['user', id], () => userService.fetchUser(id), {
    refetchOnWindowFocus: false,
    retry: false
  })

  useEffect(() => {
    if (!authUser && isError && error.response.statusText === 'Unauthorized') {
      navigate('/')
    }
  }, [error])

  if (isLoading && !user) {
    return <CircularProgress />
  }

  if (isError) {
    return <Typography>Oops, something is wrong</Typography>
  }

  const { name, username, blogs } = user

  return (
    <div>
      <Typography variant="h1">
        {name} ({username})
      </Typography>
      <Typography variant="h2">Blogs by the author:</Typography>
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
