import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsSlice'

const AddBlogForm = ({ onCancel }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const dispatch = useDispatch()

  const submitForm = (e) => {
    e.preventDefault()
    return new Promise((resolve, reject) => {
      dispatch(addBlog({ title, url, author }, resolve, reject))
    })
      .then(() => {
        onCancel()
        setTitle('')
        setUrl('')
        setAuthor('')
      })
      .catch(() => {})
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <label>Title:</label>
        <input
          className="blog_title_input"
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Url:</label>
        <input
          className="blog_url_input"
          type="url"
          placeholder="Enter a url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          className="blog_author_input"
          type="text"
          placeholder="Enter an author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <button className="add_blog_btn" type="submit">
          Add
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

AddBlogForm.propTypes = {
  onCancel: PropTypes.func.isRequired
}

export default AddBlogForm
