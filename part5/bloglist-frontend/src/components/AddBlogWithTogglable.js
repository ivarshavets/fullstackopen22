import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'

const AddBlog = ({addBlog}) => {

  return (
    <div>
      <Togglable buttonText="Show add blog form">
        <h2>Add a new blog</h2>
        <AddBlogForm
          onAddBlog={addBlog}
          onFinish={() => setIsFormVisible(false)}
        />
      </Togglable>
    </div>
  )
}

export default AddBlog
