import { createSlice, current, createSelector } from '@reduxjs/toolkit'
import {
  getAnacdotesApiCall,
  postAnecdoteApiCall,
  updateAnecdoteApiCall
} from '../services/anecdotes'
import { showNotification, createNotificationAsyncThunk } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    getAnecdotes(_state, action) {
      return action.payload
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    voteForAnecdote(state, action) {
      console.log('state', current(state))
      return state.map(el => {
        if (el.id === action.payload.id) {
          return action.payload
        }
        return el
      })
    }
  }
})

export const { getAnecdotes, addAnecdote, voteForAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

// Async Thunk action creators
export const fetchAnecdotes = () => async dispatch => {
  try {
    const response = await getAnacdotesApiCall()
    dispatch(getAnecdotes(response.data))
  } catch (error) {
    console.log(error)
  }
}

export const updateAnecdote = (payload) => async dispatch => {
  const {id, content, votes} = payload
  const updatedObj = {
    ...payload,
    votes: votes + 1
}
  try {
    const {data} = await updateAnecdoteApiCall(id, updatedObj)
    console.log('response data', data)
    dispatch(voteForAnecdote(data))
    dispatch(showNotification({message: `You voted for "${content}"`, type: 'success'}))
  } catch (error) {
    dispatch(showNotification({message: `Failed to vote for "${content}"`, type: 'error'}))
  }
}

export const createAnecdote = payload => async dispatch => {
  const data = {content: payload, votes: 0, important: true}
  try {
    const response = await postAnecdoteApiCall(data)
    dispatch(addAnecdote(response.data))
    // dispatch(showNotification({message: 'Successfully added', type: 'success'}))
    dispatch(createNotificationAsyncThunk({message: 'Successfully added'}))
  } catch (error) {
    // dispatch(showNotification({message: 'Failed to add', type: 'error'}))
    dispatch(createNotificationAsyncThunk({message: 'Failed to add', type: 'error'}))
    console.log(error)
  }
}

// export const createAnecdoteThunkActionCreator = payload => dispatch => {
//   const data = {content: payload, votes: 0, important: true}
//   postAnecdoteApiCall(data)
//     .then(({data}) => {
//       dispatch(createAnecdote(data))
//       dispatch(showNotification({message: 'Successfully added', type: 'success'}))
//     })
//     .catch(e => {
//       dispatch(showNotification({message: 'Failed to add', type: 'error'}))
//       console.log(e)
//     })
// }

// selectors
const selectFilter = ({filter}) => filter
const selectSearchQery = ({search}) => search
const selectAnecdotes = ({anecdotes}) => anecdotes || []

const selectSortedByVotesAnecdotes = (anecdotes) => {
  const sortedList = [...anecdotes]
  return sortedList.sort((a, b) => b.votes - a.votes)
}

const selectAnecdotesFilteredByImportance = (list, filter) => {
  if (filter === 'ALL') {
    return list
  }
  return filter  === 'IMPORTANT'
    ? list.filter(item => item.important)
    : list.filter(item => !item.important)
}

const selectAnecdotesFilteredByQuery = (list, query) => list.filter(({content}) =>
  query ? content.toLowerCase().includes(query.toLowerCase()) : content)

const selectFilteredAnecdotes = (anecdotes, filter, search) => {
  const sortedList = selectSortedByVotesAnecdotes(anecdotes)

  const listByImportance = selectAnecdotesFilteredByImportance(sortedList, filter)

  return selectAnecdotesFilteredByQuery(listByImportance, search)
}

export const selectVisibleAnecdotes = createSelector([
  selectAnecdotes,
  selectFilter,
  selectSearchQery
  ], (anecdotes, filter, query) => selectFilteredAnecdotes(anecdotes, filter, query)
)
