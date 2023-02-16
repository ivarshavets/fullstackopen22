import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectSortedBlogs } from '../reducers/blogsSlice'

const BlogsList = () => {
  const { status } = useSelector(({ blogs }) => blogs)
  const sortedBlogs = useSelector(selectSortedBlogs)

  if (status === 'loading') {
    return 'Loading'
  }

  if (!sortedBlogs.length) {
    return <p>There are no blogs</p>
  }

  return (
    <ul>
      {sortedBlogs.map(({ id, title }) => (
        <li key={id}>
          <Link to={`blogs/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default BlogsList
