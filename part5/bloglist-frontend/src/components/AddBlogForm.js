import { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ onAddBlog, onCancel }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const submitForm = (e) => {
    e.preventDefault()
    onAddBlog({ title, url, author })
    onCancel()
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <label>Title:</label>
        <input
          className='blog_title_input'
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
          className='blog_author_input'
          type="text"
          placeholder="Enter an author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Add</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

AddBlogForm.propTypes = {
  onAddBlog: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default AddBlogForm
