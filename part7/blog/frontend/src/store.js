import { configureStore } from '@reduxjs/toolkit'
import flashMessageReducer from './reducers/flashMessageSlice'
import blogReducer from './reducers/blogsSlice'
import userReducer from './reducers/userSlice'

const store = configureStore({
  reducer: {
    flashMessage: flashMessageReducer,
    blogs: blogReducer,
    user: userReducer
  }
})

export default store
