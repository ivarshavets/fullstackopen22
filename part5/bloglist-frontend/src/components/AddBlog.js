import AddBlogForm from './AddBlogForm'
import {useToggle} from '../hooks/useToggle'

const AddBlog = ({addBlog}) => {
  const [isFormVisible, setIsFormVisible] = useToggle()

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
        onCancel={() => setIsFormVisible(false)}
      />
    </div>
  )
}

export default AddBlog
