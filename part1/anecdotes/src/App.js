import { useState, useMemo, useCallback } from 'react'
import Button from './components/Button'
import './App.css'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]


const App = () => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({})

  const getRandomInt = (max) => Math.floor(Math.random() * max)

  const generateAnecdote = () => setSelected(getRandomInt(anecdotes.length))


  const getMostVotedIndex = useCallback(() => {
    const entriesArray = Object.entries(points)

    if (!entriesArray.length) {
      return undefined
    }

    if (entriesArray.length === 1) {
      return entriesArray[0][0]
    }

    // If multiple anecdotes are tied for first place only one of them is shown. To improve.
    return Object.entries(points).reduce((prev, curr) => prev[1] > curr[1] ? prev : curr)[0]
  }, [points])

  const mostVotedIdxMomoized = useMemo(() => getMostVotedIndex(), [getMostVotedIndex])

  const handleVote = () => {
    const point = points[selected] ? ++points[selected] : 1
    setPoints(points => ({...points, [selected]: point}))
  }

  return (
    <div className="App">
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p><strong>Votes: {points[selected] || 0}</strong></p>
      <Button onClick={handleVote} text="Vote" />
      <Button onClick={generateAnecdote} text="Next anecdote" />

      <h1>Anecdote with most votes</h1>
      <p>{mostVotedIdxMomoized ? anecdotes[mostVotedIdxMomoized] : 'No voted items yet'}</p>
      <p>It has {points[mostVotedIdxMomoized] ? points[mostVotedIdxMomoized] : 0} votes</p>
    </div>
  )
}

export default App
