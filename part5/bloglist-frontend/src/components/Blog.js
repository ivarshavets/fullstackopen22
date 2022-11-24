import { useToggle } from '../hooks/useToggle'

const Blog = ({blog: {title, url, author}}) => {
  const [isShown, toggleShown] = useToggle()

  const buttonText = isShown ? 'Hide more' : 'More'

  return (
    <div className="blog-item">
      <div>
        {title}
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
