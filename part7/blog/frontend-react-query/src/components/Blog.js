import { useParams, useNavigate } from 'react-router-dom'
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
import { useAddFlashMessage } from '../contexts/flashMessage'
import AddBlogComments from '../components/AddBlogComments'

const Blog = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const user = useAuthUser()
  const logout = useLogout()
  const addFlashMessage = useAddFlashMessage()

  const {
    data: blog,
    isLoading,
    isError,
    error
  } = useQuery(['blog', id], () => blogService.fetchBlogById(id), {
    refetchOnWindowFocus: false,
    retry: false
  })

  const { mutate: updateBlog } = useMutation((data) => blogService.patchBlog(data.id, data), {
    // response of the mutation is passed to onSuccess
    onSuccess: (newBlog) => {
      // update detail view directly, update a query's cached data
      queryClient.setQueryData(['blog', newBlog.id], (oldData) => ({
        ...oldData,
        ...newBlog
      }))
    }
  })

  const handleUpdateLikes = () => {
    updateBlog(
      { id, likes: likes + 1 },
      {
        onSuccess: () => {
          addFlashMessage('You liked the blog successfully')
        },
        onError: (error) => {
          addFlashMessage(error.response.data.error, 'error')
        }
      }
    )
  }

  const { mutate: deleteBlog } = useMutation(() => blogService.deleteBlog(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      addFlashMessage('The blog is deleted successfully')
    },
    onError: (error) => {
      addFlashMessage(error.response.data.error, 'error')
    }
  })

  const handleDelete = () => {
    const ok = window.confirm(`Are you sure you want to remove '${blog.title}`)
    if (ok) {
      deleteBlog(id, {
        onSuccess: () => {
          // show message even after component is unmounted
          addFlashMessage('The blog is deleted successfully')
          navigate('/')
        },
        onError: (error) => {
          addFlashMessage(error.response.data.error, 'error')
        }
      })
    }
  }

  useEffect(() => {
    if (isError && error.response.statusText === 'Unauthorized') {
      logout()
    }
  }, [error])

  if (!blog || !user) {
    return null
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <Typography>Oops, something is wrong</Typography>
  }

  const { title, url, author, likes, comments } = blog

  const canDelete = blog.user.username === user.username

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
        {canDelete && (
          <div>
            <Button onClick={handleDelete} color="error">
              Remove
            </Button>
          </div>
        )}
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
