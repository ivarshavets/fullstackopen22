import { useState } from 'react'
import { useDispatch } from 'react-redux'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { addComment } from '../reducers/blogsSlice'

const AddBlogComments = ({ id }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const handleAddComment = () => {
    return new Promise((resolve, reject) => {
      dispatch(addComment({ comment }, id, resolve, reject))
    })
      .then(() => {
        setComment('')
      })
      .catch(() => {})
  }

  return (
    <Box alignItems="flex-end" display="flex">
      <TextField
        value={comment}
        onChange={({ target: { value } }) => setComment(value)}
        type="text"
        name="comment"
        placeholder="Enter your comment"
        label="Comment"
        multiline
        maxRows={4}
        sx={{ mb: 0, mr: 1 }}
      />
      <Button onClick={handleAddComment}>Add comment</Button>
    </Box>
  )
}

export default AddBlogComments
