import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteAction} from './reducer'

const App = () => {
  const votes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVoteClick = (type) => {
    dispatch(voteAction(type))
  }

  return (
    <div>
      <button onClick={() => handleVoteClick('GOOD')}>good</button>
      <button onClick={() => handleVoteClick('OK')}>ok</button>
      <button onClick={() => handleVoteClick('BAD')}>bad</button>
      <button onClick={() => handleVoteClick('ZERO')}>reset stats</button>
      <div>good {votes.good}</div>
      <div>ok {votes.ok}</div>
      <div>bad {votes.bad}</div>
    </div>
  )
}

export default App
