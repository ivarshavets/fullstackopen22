import PropTypes from 'prop-types'
import { useRef } from 'react'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'

const AddBlog = ({ addBlog }) => {
  const toggleRef = useRef()

  return (
    <div>
      <Togglable buttonText="Show add blog form" ref={toggleRef}>
        <h2>Add a new blog</h2>
        <AddBlogForm onAddBlog={addBlog} onCancel={() => toggleRef.current.toggleVisibility()} />
      </Togglable>
    </div>
  )
}

AddBlogForm.propTypes = {
  onAddBlog: PropTypes.func.isRequired
}

export default AddBlog
