import { useSelector } from 'react-redux'

const Notification = () => {
  const {message, type} = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: type === 'success' ? '#4dbe3a' : '#be3a3a'
  }

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
