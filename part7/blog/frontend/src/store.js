import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogsSlice'
import userReducer from './reducers/userSlice'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer
  }
})

export default store
