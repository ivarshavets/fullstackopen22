import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ThumbUp from '@mui/icons-material/ThumbUp'

import { updateBlog, deleteBlog, selectBlogById } from '../reducers/blogsSlice'
import AddBlogComments from '../components/AddBlogComments'

const Blog = () => {
  const dispatch = useDispatch()

  const { id } = useParams()

  const selectBlogByIdMemoized = useMemo(() => selectBlogById, [id])

  const blog = useSelector((state) => selectBlogByIdMemoized(state, id))
  const user = useSelector(({ authUser }) => authUser)

  const handleUpdateLikes = () => dispatch(updateBlog({ likes: likes + 1 }, id))

  const handleDelete = () => dispatch(deleteBlog(id))

  if (!blog || !user) {
    return null
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
