import { createSlice, createAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import blogService from './../services/blogs'

export const fetchPostsAction = createAction('fetchPosts')

export const fetchBlogsThunkAction = createAsyncThunk(fetchPostsAction, async () => {
  const response = await blogService.fetchBlogs()
  return response
})

// export const addNewPost = createAsyncThunk(
//   'posts/addNewPost',
//   async (initialPost) => {
//     const response = await client.post('/fakeApi/posts', initialPost)
//     return response.data
//   }
// )

const blogSlice = createSlice({
  name: 'blogs',
  initialState: { list: [], status: 'idle', error: null }, //status: 'idle' | 'loading' | 'succeeded' | 'failed'
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsThunkAction.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBlogsThunkAction.fulfilled, (state, action) => {
        state.status = 'succedded'
        state.error = null
        state.list = action.payload
      })
      .addCase(fetchBlogsThunkAction.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

const selectAllBlogs = ({ blogs }) => blogs.list

const sortBlogsByLikes = (list) => [...list].sort((a, b) => b.likes - a.likes)

export const selectSortedBlogs = createSelector(selectAllBlogs, (blogs) => sortBlogsByLikes(blogs))

export const { addBlog } = blogSlice.actions
export default blogSlice.reducer
