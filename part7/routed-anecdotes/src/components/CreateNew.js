import { useField } from '../hooks/useField'

const CreateNew = ({addNew}) => {
  const {onReset: onContentReset, ...content} = useField({type: 'text'})
  const {onReset: onAuthorReset, ...author} = useField({type: 'text'})
  const {onReset: onInfoReset, ...info} = useField({type: 'text'})

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    onContentReset()
    onAuthorReset()
    onInfoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew
