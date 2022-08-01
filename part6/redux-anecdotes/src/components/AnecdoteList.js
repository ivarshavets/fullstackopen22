// import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, getFilteredAnecdotes } from './../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const visibleAnecdotes = useSelector(state => getFilteredAnecdotes(state))

  // // anecdotes with the use of useMemo
  // const visibilityFilter = useSelector(({filter}) => filter)
  // const anecdotes = useSelector(({anecdotes}) => anecdotes || [])
  // const visibleAnecdotes = useMemo(() => {
  //   const sortedByVotesList = [...anecdotes.sort((a, b) => b.votes - a.votes)]

  //   if (visibilityFilter === 'ALL') {
  //     return sortedByVotesList
  //   }

  //   return visibilityFilter  === 'IMPORTANT'
  //     ? sortedByVotesList.filter(item => item.important)
  //     : sortedByVotesList.filter(item => !item.important)
  //   }, [anecdotes, visibilityFilter])

  const dispatch = useDispatch()

  const handleVote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
  }

  return (
    visibleAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote.id)}>vote</button>
        </div>
      </div>
    ))
}

export default AnecdoteList
