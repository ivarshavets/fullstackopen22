import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsSlice'

const AddBlogComments = ({ id }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const handleAddComment = () => {
    return new Promise((resolve, reject) => {
      dispatch(addComment({ comment }, id, resolve, reject))
    })
      .then(() => {
        setComment('')
      })
      .catch(() => {})
  }

  return (
    <div>
      <textarea
        value={comment}
        onChange={({ target: { value } }) => setComment(value)}
        type="text"
        name="comment"
        placeholder="Enter your comment"
      />
      <button onClick={handleAddComment}>Add comment</button>
    </div>
  )
}

export default AddBlogComments
