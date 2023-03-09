import { configureStore } from '@reduxjs/toolkit'
import flashMessageReducer from './reducers/flashMessageSlice'
import blogsReducer from './reducers/blogsSlice'
import usersReducer from './reducers/usersSlice'

const store = configureStore({
  reducer: {
    flashMessage: flashMessageReducer,
    blogs: blogsReducer,
    users: usersReducer
  }
})

export default store
