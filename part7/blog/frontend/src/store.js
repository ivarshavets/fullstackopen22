import { configureStore } from '@reduxjs/toolkit'
import flashMessageReducer from './reducers/flashMessageSlice'
import blogsReducer from './reducers/blogsSlice'
import usersReducer from './reducers/usersSlice'
import authReducer from './reducers/authSlice'

const store = configureStore({
  reducer: {
    flashMessage: flashMessageReducer,
    blogs: blogsReducer,
    authUser: authReducer,
    users: usersReducer
  }
})

export default store
