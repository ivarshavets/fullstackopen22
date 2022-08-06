import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { postAnecdoteApiCall } from '../services/anecdotes'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { showNotification } from './../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const input = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {content: input.current.value, votes: 0, important: true}
    postAnecdoteApiCall(data)
      .then(({data}) => {
        dispatch(createAnecdote(data))
        dispatch(showNotification({message: 'Successfully added', type: 'success'}))
      })
      .catch(e => {
        dispatch(showNotification({message: 'Failed to add', type: 'error'}))
        console.log(e)
      })
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
