import { useState } from "react"

const AddBlogForm = ({addBlog}) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const submitForm = (e) => {
    e.preventDefault()
    addBlog({title, url, author})
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Url:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
  </form>
  )
}

export default AddBlogForm
