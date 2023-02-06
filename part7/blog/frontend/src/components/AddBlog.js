import AddBlogForm from './AddBlogForm'
import { useToggle } from '../hooks/useToggle'

const AddBlog = () => {
  const [isFormVisible, setIsFormVisible] = useToggle()

  if (!isFormVisible) {
    return (
      <div>
        <button className="add_blog_form_btn" onClick={() => setIsFormVisible(true)}>
          Add new blog
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <AddBlogForm onCancel={() => setIsFormVisible(false)} />
    </div>
  )
}

export default AddBlog
