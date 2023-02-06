import { createSlice, createAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import blogService from './../services/blogs'
import { showFlashMessage } from './flashMessageSlice'

// Action creators
export const fetchBlogsAction = createAction('blogs/fetchBlogs')

export const addBlogRequested = createAction('blogs/addBlogRequested') // Started
export const addBlogFailed = createAction('blogs/addBlogFailed')

// Thunk functions
export const fetchBlogsThunkAction = createAsyncThunk(fetchBlogsAction, async () => {
  const response = await blogService.fetchBlogs()
  return response
})

export const addBlog = (payload, resolve, reject) => {
  return async (dispatch) => {
    try {
      const response = await blogService.postBlog(payload)
      dispatch(addBlogSucceeded(response))
      dispatch(showFlashMessage('Blog is added successfully'))
      resolve(response)
    } catch (error) {
      console.log('error', error)
      dispatch(addBlogFailed(error.response.data.error))
      dispatch(showFlashMessage(error.response.data.error, 'error'))
      reject(error.response.data.error)
    }
  }
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: { list: [], status: 'idle', error: null }, //status: 'idle' | 'loading' | 'succeeded' | 'failed'
  reducers: {
    addBlogSucceeded(state, { payload }) {
      state.list.push(payload)
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

// Selectors
const selectAllBlogs = ({ blogs }) => blogs.list

const sortBlogsByLikes = (list) => [...list].sort((a, b) => b.likes - a.likes)

export const selectSortedBlogs = createSelector(selectAllBlogs, (blogs) => sortBlogsByLikes(blogs))

export const { addBlogSucceeded } = blogSlice.actions
export default blogSlice.reducer
