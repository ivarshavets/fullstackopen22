import { createSlice, current, createSelector } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const getRandomBoolen = () => Math.random() < 0.5

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
    important: getRandomBoolen()
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(asObject(action.payload))
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

export const { createAnecdote, voteForAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

// selectors
const getFilter = ({filter}) => filter
const getSearchQery = ({search}) => search
const getAnecdotes = ({anecdotes}) => anecdotes

const getSortedByVotesAnecdotes = (anecdotes) => {
  const sortedList = [...anecdotes || []]
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

const getAnecdotesFilteredByQuery = (list, query) => {
  if (!query) {
    return list
  }

  return list.filter(({content}) => content.toLowerCase().includes(query.toLowerCase()))
}

const getFilteredAnecdotes = (anecdotes, filter, search) => {
  const sortedList = getSortedByVotesAnecdotes(anecdotes)

  const listByImportance = getAnecdotesFilteredByImportance(sortedList, filter)

  const searched = getAnecdotesFilteredByQuery(listByImportance, search)

  return getAnecdotesFilteredByQuery(listByImportance)
}

export const selectFilteredAnecdotes = createSelector([
  getAnecdotes,
  getFilter,
  getSearchQery
  ], (anecdotes, filter, query) => getFilteredAnecdotes(anecdotes, filter, query)
)
