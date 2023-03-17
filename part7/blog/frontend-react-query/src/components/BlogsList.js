import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'

import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import CircularProgress from '@mui/material/CircularProgress'

import blogService from '../services/blogs'
import { useAuthUser } from '../contexts/authUser'

const BlogsList = () => {
  const navigate = useNavigate()

  const user = useAuthUser()

  const { data, isLoading, isError, error } = useQuery('blogs', blogService.fetchBlogs, {
    refetchOnWindowFocus: false,
    retry: false
    // onSuccess: (data) => (data || []).sort((a, b) => b.likes - a.likes)
  })

  const sortedBlogs = useMemo(() => (data || []).sort((a, b) => b.likes - a.likes), [data])

  if ((!user || !data) && isLoading) {
    return <CircularProgress />
  }

  if (!user && isError && error.response.statusText === 'Unauthorized') {
    navigate('/')
  }

  if (isError) {
    return <Typography>Oops, something is wrong</Typography>
  }

  if (!data.length) {
    return <Typography>There are no blogs</Typography>
  }

  return (
    <div>
      <Typography variant="h1">Blogs</Typography>
      <List dense>
        {sortedBlogs.map(({ id, title }) => (
          <ListItem key={id}>
            <ListItemButton component={Link} to={`blogs/${id}`}>
              {title}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default BlogsList
