import { useEffect, useRef, useCallback, useState } from 'react'
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

  const timer = useRef(null)

  const [isShown, setIsShown] = useState(false)

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }, [])

  useEffect(() => {
    if (message) {
      setIsShown(true)
    }
    return () => setIsShown(false)
  }, [message])

  useEffect(() => {
    timer.current = setTimeout(() => {
      if (timer.current) {
        setIsShown(false)
        dispatch(removeNotification())
        timer.current = null
      }
    }, 5000)

    return clearTimer
  }, [message, clearTimer, removeNotification, dispatch])

  return (
    isShown &&
    (<div style={style}>
      {message}
    </div>)
    )
}

export default Notification
