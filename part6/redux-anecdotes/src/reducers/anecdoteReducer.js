import { createSlice, current, createSelector } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    fetchAnecdotes(_state, action) {
      return action.payload
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteForAnecdote(state, action) {
      console.log('state', current(state))
      return state.map(el => {
        if (el.id === action.payload) {
          return {...el, votes: el.votes + 1}
        }
        return el
      })
    }
  }
})

export const { fetchAnecdotes, createAnecdote, voteForAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

// selectors
const getFilter = ({filter}) => filter
const getSearchQery = ({search}) => search
const getAnecdotes = ({anecdotes}) => anecdotes || []

const getSortedByVotesAnecdotes = (anecdotes) => {
  const sortedList = [...anecdotes]
  return sortedList.sort((a, b) => b.votes - a.votes)
}

const getAnecdotesFilteredByImportance = (list, filter) => {
  if (filter === 'ALL') {
    return list
  }
  return filter  === 'IMPORTANT'
    ? list.filter(item => item.important)
    : list.filter(item => !item.important)
}

const getAnecdotesFilteredByQuery = (list, query) => list.filter(({content}) =>
  query ? content.toLowerCase().includes(query.toLowerCase()) : content)

const getFilteredAnecdotes = (anecdotes, filter, search) => {
  const sortedList = getSortedByVotesAnecdotes(anecdotes)

  const listByImportance = getAnecdotesFilteredByImportance(sortedList, filter)

  return getAnecdotesFilteredByQuery(listByImportance, search)
}

export const selectFilteredAnecdotes = createSelector([
  getAnecdotes,
  getFilter,
  getSearchQery
  ], (anecdotes, filter, query) => getFilteredAnecdotes(anecdotes, filter, query)
)
