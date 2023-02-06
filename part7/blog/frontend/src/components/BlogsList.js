import { useSelector } from 'react-redux'
import { selectSortedBlogs } from '../reducers/blogsSlice'
import Blog from '../components/Blog'

const BlogsList = () => {
  const { status } = useSelector(({ blogs }) => blogs)
  const sortedBlogs = useSelector(selectSortedBlogs)

  if (status === 'loading') {
    return 'Loading'
  }

  return sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} />)
}

export default BlogsList
