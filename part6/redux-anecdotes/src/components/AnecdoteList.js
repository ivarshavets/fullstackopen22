// import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote, getFilteredAnecdotes } from './../reducers/anecdoteReducer'
import { showNotification } from './../reducers/notificationReducer'

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

  const handleVote = ({id, content}) => {
    dispatch(voteForAnecdote(id))
    dispatch(showNotification({message: `You voted for "${content}"`, type: 'success'}))
  }

  return (
    visibleAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    ))
}

export default AnecdoteList
