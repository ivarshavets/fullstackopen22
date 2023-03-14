import PropTypes from 'prop-types'
import { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import blogService from '../services/blogs'
import { useAddFlashMessage } from '../contexts/flashMessage'

const AddBlogForm = ({ onCancel }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const addFlashMessage = useAddFlashMessage()
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation(blogService.postBlog, {
    onSuccess: (newBlog) => {
      // queryClient.invalidateQueries('blogs') // leads to 2 requests
      // setQueryData offers optimisation to get rid of 2 request for posting a new blog and refetching a query for it
      // newBlog value of the parameter is the value returned by the postBlog request
      // const blogs = queryClient.getQueryData('blogs')
      // queryClient.setQueryData('blogs', blogs.concat(newBlog))
      queryClient.setQueryData('blogs', (blogs) => blogs.concat(newBlog))
    }
  })

  const submitForm = async (e) => {
    e.preventDefault()
    newBlogMutation.mutate(
      { title, url, author },
      {
        onSuccess: (data) => {
          addFlashMessage(`Blog ${data.title} is added successfully`)
          onCancel()
          setTitle('')
          setUrl('')
          setAuthor('')
        },
        onError: (error) => {
          addFlashMessage(error.response.data.error, 'error')
        }
      }
    )
  }

  return (
    <form onSubmit={submitForm}>
      <TextField
        className="blog_title_input"
        type="text"
        placeholder="Enter a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
        required
        sx={{ mr: 1 }}
      />
      <TextField
        className="blog_url_input"
        type="url"
        placeholder="Enter a url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        label="Url"
        required
        sx={{ ml: 1, mr: 1 }}
      />
      <TextField
        className="blog_author_input"
        type="text"
        placeholder="Enter an author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
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
