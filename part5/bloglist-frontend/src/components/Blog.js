import { useToggle } from '../hooks/useToggle'

const Blog = ({blog: {id, title, url, author, likes}, updateBlog}) => {
  const [isShown, toggleShown] = useToggle()

  const buttonText = isShown ? 'Hide more' : 'More'

  const updateLikes = () => updateBlog({likes: likes + 1}, id)

  return (
    <div className="blog-item">
      <div>
        {title}
        <div>{likes} <button onClick={updateLikes}>Like</button></div>
        <div><button onClick={toggleShown}>{buttonText}</button></div>
      </div>
      {isShown && (
        <div>
          <div>{url}</div>
          <div>{author}</div>
        </div>)}
    </div>
  )
}

export default Blog
