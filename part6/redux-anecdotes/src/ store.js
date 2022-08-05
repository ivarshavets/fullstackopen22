import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import searchAnecdote from './reducers/searchReducer'
import notificationReducer from './reducers/notificationReducer'
// import { createStore } from 'redux'
// import reducer from './reducers/anecdoteReducer'

// Replaced by configureStore
// const store = createStore(reducer)

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    search: searchAnecdote,
    notification: notificationReducer
  }
})

export default store
