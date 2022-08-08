import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const input = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createAnecdote(input.current.value))
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

export default AnecdoteForm
