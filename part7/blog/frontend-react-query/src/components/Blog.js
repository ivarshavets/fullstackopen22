import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ThumbUp from '@mui/icons-material/ThumbUp'

import blogService from '../services/blogs'
import { useAuthUser, useLogout } from '../contexts/authUser'
import { deleteBlog } from '../reducers/blogsSlice'
import AddBlogComments from '../components/AddBlogComments'

const Blog = () => {
  const { id } = useParams()

  const user = useAuthUser()
  const logout = useLogout()

  const queryClient = useQueryClient()

  const {
    data: blog,
    isLoading,
    isError,
    error
  } = useQuery(['blog', id], () => blogService.fetchBlogById(id), {
    refetchOnWindowFocus: false,
    retry: false
  })

  const { mutate } = useMutation((data) => blogService.patchBlog(data.id, data), {
    onSuccess: (newData) => {
      // update a query's cached data
      queryClient.setQueryData(['blog', id], (oldData) => ({ ...oldData, ...newData }))
    }
  })

  const handleUpdateLikes = () => mutate({ id, likes: likes + 1 })

  const handleDelete = () => deleteBlog(id)

  useEffect(() => {
    if (isError && error.response.statusText === 'Unauthorized') {
      logout()
    }
  }, [error])

  if (!user) {
    return null
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <Typography>Oops, something is wrong</Typography>
  }

  const { title, url, author, likes, comments } = blog

  return (
    <div className="blog_item">
      <Box mb={4}>
        <Typography className="blog_title" variant="h1">
          {title}
        </Typography>
        <Typography className="blog_author" mb={1}>
          Author: <strong>{author}</strong>
        </Typography>
        <Typography mb={1}>URL: {url}</Typography>
        <Typography mb={1}>
          Likes: {likes}
          <IconButton onClick={handleUpdateLikes} color="primary" sx={{ ml: 1, mr: 1, mb: 1 }}>
            <ThumbUp className="like_btn" />
          </IconButton>
        </Typography>
        <div>
          <Button onClick={handleDelete} color="error">
            Remove
          </Button>
        </div>
      </Box>
      <div>
        <Typography variant="h3" mb={1}>
          Comments
        </Typography>
        <AddBlogComments id={id} />
        {comments && (
          <ul>
            {comments.map(({ id, comment }) => (
              <li key={id}>{comment}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Blog
