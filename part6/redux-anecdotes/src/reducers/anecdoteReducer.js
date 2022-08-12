import { createSlice, current, createSelector, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAnacdotesApiCall,
  postAnecdoteApiCall,
  updateAnecdoteApiCall
} from '../services/anecdotes'
import { showNotification } from './notificationReducer'
// import { createNotificationAsyncThunk } from './notificationReducer'

export const fetchAnecdotesAction = createAction('fetch')

// Async Thunk action creator implemented with createAsyncThunk
export const fetchAnecdotesAsyncThunk = createAsyncThunk(fetchAnecdotesAction, async () => {
    try {
      const response = await getAnacdotesApiCall()
      return response.data
    } catch (error) {
      console.log(error)
      return error
    }
  }
)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: {list: [], isLoading: false, isError: false},
  reducers: {
    // used only in case of using fetchAnecdotes thunk
    // getAnecdotes(_state, action) {
    //   return action.payload
    // },
    addAnecdote(state, action) {
      state.list.push(action.payload)
    },
    voteForAnecdote(state, action) {
      console.log('state', current(state))
      return {
        ...state,
        list: state.list.map(el => {
        if (el.id === action.payload.id) {
          return action.payload
        }
        return el
      })}
    }
  },
  // // "map object" notation
  // extraReducers: {
  //     [fetchAnecdotesAsyncThunk.pending]: (state) => {
  //       state.isLoading = true
  //     },
  //     [fetchAnecdotesAsyncThunk.fulfilled]: (state, action) => {
  //       state.isLoading = false
  //       state.isError = false
  //       state.list.push(...action.payload)
  //     },
  //     [fetchAnecdotesAsyncThunk.rejected]: (state) => {
  //       state.isError = true
  //     }
  //   },

  // "builder callback" notation
  extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchAnecdotesAsyncThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAnecdotesAsyncThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.list.push(...action.payload)
      })
      .addCase(fetchAnecdotesAsyncThunk.rejected, (state) => {
        state.isError = true
      })
  }
})

export const { getAnecdotes, addAnecdote, voteForAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

//Async Thunk action creators

// // Thunk fetchAnecdotes in case not using createAsyncThunk.
// // It will be dispatch on render of a component

// export const fetchAnecdotes = () => async dispatch => {
//   try {
//     const response = await getAnacdotesApiCall()
//     dispatch(getAnecdotes(response.data))
//   } catch (error) {
//     console.log(error)
//   }
// }

export const updateAnecdote = (payload) => async dispatch => {
  const {id, content, votes} = payload
  const updatedObj = {
    ...payload,
    votes: votes + 1
}
  try {
    const {data} = await updateAnecdoteApiCall(id, updatedObj)
    dispatch(voteForAnecdote(data))
    dispatch(showNotification({message: `You voted for "${content}"`, type: 'success'}))
    // dispatch(createNotificationAsyncThunk({message: `You voted for "${content}"`}))
  } catch (error) {
    dispatch(showNotification({message: `Failed to vote for "${content}"`, type: 'error'}))
  }
}

export const createAnecdote = payload => async dispatch => {
  const data = {content: payload, votes: 0, important: true}
  try {
    const response = await postAnecdoteApiCall(data)
    dispatch(addAnecdote(response.data))
    dispatch(showNotification({message: 'Successfully added', type: 'success'}))
    // dispatch(createNotificationAsyncThunk({message: 'Successfully added'}))
  } catch (error) {
    dispatch(showNotification({message: 'Failed to add', type: 'error'}))
    // dispatch(createNotificationAsyncThunk({message: 'Failed to add', type: 'error'}))
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
const selectAnecdotes = ({anecdotes: {list}}) => list || []

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
