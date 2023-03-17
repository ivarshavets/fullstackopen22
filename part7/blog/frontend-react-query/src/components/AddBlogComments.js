import { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import blogService from '../services/blogs'
import { useAddFlashMessage } from '../contexts/flashMessage'

const AddBlogComments = ({ id }) => {
  const [comment, setComment] = useState('')

  const addFlashMessage = useAddFlashMessage()

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    ({ id, comment }) => blogService.addBlogComments(id, { comment }),
    {
      onSuccess: (newData) => {
        queryClient.setQueryData(['blog', id], (oldData) => ({
          ...oldData,
          comments: [...oldData.comments, { id: newData.id, comment: newData.comment }]
        }))
        // queryClient.invalidateQueries(['blog', id])
      }
    }
  )

  const handleAddComment = () => {
    mutate(
      { id, comment },
      {
        onSuccess: () => {
          setComment('')
          addFlashMessage('The comment is successfully added')
        },
        onError: (error) => {
          addFlashMessage(error.response.data.error, 'error')
        }
      }
    )
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
