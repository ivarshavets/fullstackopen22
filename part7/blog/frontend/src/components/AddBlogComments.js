import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { addComment } from '../reducers/blogsSlice'

const AddBlogComments = () => {
  const [comment, setComment] = useState('')

  // const dispatch = useDispatch()
  // const handleCommentSave = dispatch(addComment)

  // const addComment = () => {
  //   dispatch(commentBlog(blog.id, comment))
  //   notifyWith('Comment added!')
  //   setComment('')

  return (
    <div>
      <textarea
        value={comment}
        onChange={({ target: { value } }) => setComment(value)}
        type="text"
        name="comment"
        placeholder="Enter your comment"
      />
      <button>Add comment</button>
    </div>
  )
}

export default AddBlogComments
