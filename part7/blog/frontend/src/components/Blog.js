import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog, selectBlogById } from '../reducers/blogsSlice'
import AddBlogComments from '../components/AddBlogComments'

const Blog = () => {
  const dispatch = useDispatch()

  const { id } = useParams()

  const selectBlogByIdMemoized = useMemo(() => selectBlogById, [id])

  const blog = useSelector((state) => selectBlogByIdMemoized(state, id))
  const user = useSelector(({ authUser }) => authUser)

  const handleUpdateLikes = () => dispatch(updateBlog({ likes: likes + 1 }, id))

  const handleDelete = () => dispatch(deleteBlog(id))

  if (!blog || !user) {
    return null
  }

  const { title, url, author, likes, comments } = blog

  return (
    <div className="blog_item">
      <h2 className="blog_title">{title}</h2>
      <div className="blog_author">
        Author: <strong>{author}</strong>
      </div>
      <div>url: {url}</div>
      <div>
        Likes: {likes}{' '}
        <button className="like_btn" onClick={handleUpdateLikes}>
          Like
        </button>
      </div>
      <div>
        <button onClick={handleDelete}>Remove</button>
      </div>
      <div>
        <h4>Comments</h4>
        <AddBlogComments />
        <ul>
          {comments.map(({ id, comment }) => (
            <li key={id}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
