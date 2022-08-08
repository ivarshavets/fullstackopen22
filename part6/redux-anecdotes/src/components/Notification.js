import { useEffect, useRef, useCallback } from 'react'
// import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const {message, type} = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: type === 'success' ? '#4dbe3a' : '#be3a3a'
  }

  // // Simple version

  // useEffect(() => {
  //   if (!message) return

  //   const timeoutId = setTimeout(() => {
  //     dispatch(removeNotification())
  //   }, 5000)

  //   return () => {
  //     if (timeoutId !== null) {
  //       clearTimeout(timeoutId)
  //     }
  //   }
  // }, [message, removeNotification])


  const timer = useRef(null)

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }, [])

  useEffect(() => {
    if (!message) {
      return () => {}
    }

    timer.current = setTimeout(() => {
      if (timer.current) {
        dispatch(removeNotification())
        // timer.current = null
      }
    }, 5000)

    return clearTimer
  }, [message, clearTimer, dispatch])

  if (!message) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
