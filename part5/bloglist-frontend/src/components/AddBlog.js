import { useState } from 'react'
import AddBlogForm from './AddBlogForm'

const AddBlog = ({addBlog}) => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  if (!isFormVisible) {
    return (
      <div>
        <button onClick={() => setIsFormVisible(true)}>
          Add new blog
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <AddBlogForm
        onAddBlog={addBlog}
        onFinish={() => setIsFormVisible(false)}
      />
    </div>
  )
}

export default AddBlog
