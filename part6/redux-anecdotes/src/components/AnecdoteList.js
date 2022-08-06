import { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAnecdotes, voteForAnecdote, selectFilteredAnecdotes } from './../reducers/anecdoteReducer'
import { showNotification } from './../reducers/notificationReducer'
import { getAnacdotesApiCall } from '../services/anecdotes'

const AnecdoteList = () => {
  const visibleAnecdotes = useSelector(selectFilteredAnecdotes)

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

  useEffect(() => {
    getAnacdotesApiCall().then(({data}) =>
      dispatch(fetchAnecdotes(data))
    )
  }, [])

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
