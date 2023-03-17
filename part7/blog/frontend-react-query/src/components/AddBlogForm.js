import PropTypes from 'prop-types'
import { useQueryClient, useMutation } from 'react-query'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import blogService from '../services/blogs'
import { useAddFlashMessage } from '../contexts/flashMessage'
import { useFormField } from '../hooks/useFormField'

const AddBlogForm = ({ onCancel }) => {
  const { fields: titleFields, reset: resetTitle } = useFormField()
  const { fields: urlFields, reset: resetUrl } = useFormField()
  const { fields: authorFields, reset: resetAuthor } = useFormField()

  const addFlashMessage = useAddFlashMessage()
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation(blogService.postBlog, {
    onSuccess: (newBlog) => {
      // queryClient.invalidateQueries('blogs') // this leads to 2 requests
      // setQueryData offers optimisation to update the blogs list directly
      // newBlog value of the parameter is the value returned by the postBlog request
      queryClient.setQueryData('blogs', (blogs) => blogs.concat(newBlog))
    }
  })

  const submitForm = async (e) => {
    e.preventDefault()
    newBlogMutation.mutate(
      { title: titleFields.value, url: urlFields.value, author: authorFields.value },
      {
        onSuccess: (data) => {
          addFlashMessage(`Blog ${data.title} is added successfully`)
          onCancel()
          resetTitle()
          resetUrl()
          resetAuthor()
        },
        onError: (error) => {
          addFlashMessage(error.response.data.error, 'error')
          resetTitle()
          resetUrl()
          resetAuthor()
        }
      }
    )
  }

  return (
    <form onSubmit={submitForm}>
      <TextField
        className="blog_title_input"
        {...titleFields}
        type="text"
        placeholder="Enter a title"
        label="Title"
        required
        sx={{ mr: 1 }}
      />
      <TextField
        className="blog_url_input"
        {...urlFields}
        type="url"
        placeholder="Enter a url"
        label="Url"
        required
        sx={{ ml: 1, mr: 1 }}
      />
      <TextField
        className="blog_author_input"
        {...authorFields}
        type="text"
        placeholder="Enter an author"
        label="Author"
        required
        sx={{ ml: 1 }}
      />
      <Box mt={1}>
        <Button
          className={`add_blog_btn ${newBlogMutation.isLoading ? 'disabled' : ''}`}
          type="submit"
          sx={{ mr: 0.5 }}
        >
          Add
        </Button>
        <Button type="button" onClick={onCancel} variant="outlined" sx={{ ml: 0.5 }}>
          Cancel
        </Button>
      </Box>
    </form>
  )
}

AddBlogForm.propTypes = {
  onCancel: PropTypes.func.isRequired
}

export default AddBlogForm
