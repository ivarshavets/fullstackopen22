// Implementation with createStore function
// rootReducer was needed for combineReducers function used in createStore of Redux:
// const store = createStore(rootReducer)
// It's replaced by configureStore of React Toolkit

// rootReducer can be kept for nested reducer structure.
// coonfigureStore only call combineRecuer for one level of reducers automatically.
// Need to call combineReducers yourself to handle the nesting.

import { combineReducers } from 'redux'
import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

export default rootReducer
