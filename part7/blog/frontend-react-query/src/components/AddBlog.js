import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import AddBlogForm from './AddBlogForm'
import { useToggle } from '../hooks/useToggle'

const AddBlog = () => {
  const [isFormVisible, setIsFormVisible] = useToggle()

  if (!isFormVisible) {
    return (
      <Button
        className="add_blog_form_btn"
        onClick={() => setIsFormVisible(true)}
        variant="outlined"
      >
        Add new blog
      </Button>
    )
  }

  return (
    <div>
      <Typography variant="h2">Add a new blog</Typography>
      <AddBlogForm onCancel={() => setIsFormVisible(false)} />
    </div>
  )
}

export default AddBlog
