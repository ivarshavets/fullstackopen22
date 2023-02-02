import { useSelector } from 'react-redux'

const FlashMessage = () => {
  const message = useSelector(({ flashMessage }) => flashMessage)

  if (!message) {
    return null
  }

  return (
    <div className={`flash_message flash-message flash-message--${message.type}`}>
      {message.text}
    </div>
  )
}

export default FlashMessage
