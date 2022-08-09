import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({createAnecdote}) => {
  const input = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    createAnecdote(input.current.value)
    input.current.value = ''
    // e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div><input type="text" name="anecdoteText" ref={input} /></div>
      <button type="submit">create</button>
    </form>
  )
}

// mapDispatchToProps defined as a function
const mapDispatchToProps = (dispatch) => ({
  createAnecdote: (value) => dispatch(createAnecdote(value))
})

export default connect(null, mapDispatchToProps)(AnecdoteForm)
