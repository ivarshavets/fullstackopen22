import { useEffect } from 'react'
// import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAnecdotesAsyncThunk, updateAnecdote, selectVisibleAnecdotes } from './../reducers/anecdoteReducer'
// import { fetchAnecdotes } from './../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const visibleAnecdotes = useSelector(selectVisibleAnecdotes)
  const {isError, isLoading} = useSelector(({anecdotes}) => anecdotes)

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
    dispatch(fetchAnecdotesAsyncThunk())
    // dispatch(fetchAnecdotes())
    // getAnacdotesApiCall().then(({data}) =>
    //   dispatch(fetchAnecdotes(data))
    // )
  }, [dispatch])

  const handleVote = (item) => {
    dispatch(updateAnecdote(item))
  }

  if (isLoading && !visibleAnecdotes.length) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Something went wrong</div>
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
