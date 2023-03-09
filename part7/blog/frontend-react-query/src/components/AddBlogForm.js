import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { addBlog } from '../reducers/blogsSlice'
import { useAddFlashMessage } from '../contexts/flashMessage'

const AddBlogForm = ({ onCancel }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const dispatch = useDispatch()
  const dispatchAddFlashMessage = useAddFlashMessage()

  const submitForm = (e) => {
    e.preventDefault()
    return new Promise((resolve, reject) => {
      dispatch(addBlog({ title, url, author }, resolve, reject))
    })
      .then(() => {
        dispatchAddFlashMessage('Success')
        onCancel()
        setTitle('')
        setUrl('')
        setAuthor('')
      })
      .catch(() => {})
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
        <Button className="add_blog_btn" type="submit" sx={{ mr: 0.5 }}>
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
