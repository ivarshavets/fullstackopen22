import { createSlice, createAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import blogService from './../services/blogs'
import { showFlashMessage } from './flashMessageSlice'

// Action creators
const fetchBlogsAction = createAction('blogs/fetchBlogs')

// export const addBlogRequested = createAction('blogs/addBlogRequested') // Started
const addBlogFailed = createAction('blogs/addBlogFailed')

const deleteBlogFailed = createAction('blogs/deleteBlogFailed')

const updateBlogFailed = createAction('blogs/updateBlogFailed')

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
      dispatch(addBlogFailed(error.response.data.error))
      dispatch(showFlashMessage(error.response.data.error, 'error'))
      reject(error.response.data.error)
    }
  }
}

export const updateBlog = (payload, id) => {
  return async (dispatch) => {
    try {
      const response = await blogService.patchBlog(payload, id)
      dispatch(updateBlogSucceeded(response))
      dispatch(showFlashMessage('You liked the blog successfully'))
    } catch (error) {
      dispatch(updateBlogFailed(error.response.data.error))
      dispatch(showFlashMessage(error.response.data.error, 'error'))
    }
  }
}

export const deleteBlog = (payload) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(payload)
      dispatch(deleteBlogSucceeded(payload))
      dispatch(showFlashMessage('The blog is deleted successfully'))
    } catch (error) {
      console.log(error)
      dispatch(deleteBlogFailed(error.response.data.error))
      dispatch(showFlashMessage(error.response.data.error, 'error'))
    }
  }
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: { list: [], status: 'idle', error: null },
  // Use a "state machine" approach for loading state instead of booleans
  // Status: 'idle' | 'loading' | 'succeeded' | 'failed'
  reducers: {
    addBlogSucceeded({ list }, { payload }) {
      // return state.list.concat(payload)
      list.push(payload)
    },
    updateBlogSucceeded(state, { payload }) {
      const newList = state.list.map((item) => {
        if (item.id === payload.id) {
          return payload
        }
        return item
      })
      state.list = newList
    },
    deleteBlogSucceeded(state, { payload }) {
      // return state.list.filter(({ id }) => id !== payload)
      const newList = state.list.filter(({ id }) => id !== payload)
      state.list = newList
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

const { addBlogSucceeded, updateBlogSucceeded, deleteBlogSucceeded } = blogSlice.actions
export default blogSlice.reducer
