import PropTypes from 'prop-types'
import AddBlogForm from './AddBlogForm'
import { useToggle } from '../hooks/useToggle'

const AddBlog = ({ addBlog }) => {
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
      <AddBlogForm onAddBlog={addBlog} onCancel={() => setIsFormVisible(false)} />
    </div>
  )
}

AddBlog.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default AddBlog
