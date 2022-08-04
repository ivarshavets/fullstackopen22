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

// actions
const VOTE = 'VOTE'
const ADD_ANECDOTE = 'ADD_ANECDOTE'

// action creators
export const vote = (id) => ({
  type: VOTE,
  payload: {id}
})

export const addAnecdote = (text) => ({
  type: ADD_ANECDOTE,
  payload: {
    content: text,
    id: getId(),
    votes: 0,
    important: false
  }
})

const initialState = anecdotesAtStart.map(asObject)


const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case VOTE:
      return state.map(el => {
        if (el.id === action.payload.id) {
          return {...el, votes: el.votes + 1}
        }
        return el
      })
    case ADD_ANECDOTE:
      return ([...state, action.payload])
    default:
      return state
  }
}

// selectors
// need memoization with reselect
export const getSortedByVotesAnecdotes = (anecdotes) => [...(anecdotes || []).sort((a, b) => b.votes - a.votes)]

export const getFilteredAnecdotes = ({anecdotes, filter}) => {
  const list = getSortedByVotesAnecdotes(anecdotes)

  if (filter === 'ALL') {
    return list
  }
  return filter  === 'IMPORTANT'
    ? list.filter(item => item.important)
    : list.filter(item => !item.important)
}

export default anecdoteReducer
