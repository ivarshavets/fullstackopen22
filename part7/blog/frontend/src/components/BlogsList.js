import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { showFlashMessage } from '../reducers/flashMessageSlice'
import { selectSortedBlogs } from '../reducers/blogsSlice'
import Blog from '../components/Blog'

const BlogsList = () => {
  const { status } = useSelector(({ blogs }) => blogs)
  const sortedBlogs = useSelector(selectSortedBlogs)
  const dispatch = useDispatch()

  const updateBlog = (payload, id) => {
    blogService
      .patchBlog(payload, id)
      .then((data) => {
        // const updatedBlogsList = list.map((blog) => {
        //   if (blog.id === id) {
        //     return {
        //       ...blog,
        //       ...data
        //     }
        //   }
        //   return blog
        // })
        // setBlogs(getSortedBlogs(updatedBlogsList))
        console.log('UpdatedBlogsResponse', data)
        dispatch(showFlashMessage('You liked the blog successfully'))
      })
      .catch((e) => {
        dispatch(showFlashMessage(e.response.data.error, 'error'))
      })
  }

  const deleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete the blog?')) {
      blogService
        .deleteBlog(id)
        .then(() => {
          // const updatedBlogsList = list.filter((blog) => blog.id !== id)
          // setBlogs(updatedBlogsList)
          dispatch(showFlashMessage('The blog is deleted successfully'))
        })
        .catch((e) => {
          dispatch(showFlashMessage(e.response.data.error, 'error'))
        })
    }
  }

  if (status === 'loading') {
    return 'Loading'
  }

  return sortedBlogs.map((blog) => (
    <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
  ))
}

export default BlogsList
