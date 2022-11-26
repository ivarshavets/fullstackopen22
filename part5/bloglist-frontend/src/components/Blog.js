import { useToggle } from '../hooks/useToggle'

const Blog = ({
  blog: {id, title, url, author, likes},
  updateBlog,
  deleteBlog
}) => {
  const [isShown, toggleShown] = useToggle()

  const buttonText = isShown ? 'Hide more' : 'More'

  const handleUpdateLikes = () => updateBlog({likes: likes + 1}, id)

  const handleDelete = () => deleteBlog(id)

  return (
    <div className="blog-item">
      <div>
        {title}
        <div>Likes: {likes} <button onClick={handleUpdateLikes}>Like</button></div>
        <div><button onClick={toggleShown}>{buttonText}</button></div>
      </div>
      {isShown && (
        <div>
          <div>{url}</div>
          <div>{author}</div>
        </div>)}
      <div><button onClick={handleDelete}>Remove</button></div>
    </div>
  )
}

export default Blog
