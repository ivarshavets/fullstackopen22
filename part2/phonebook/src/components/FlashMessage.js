const FlashMessage = ({message}) => {
  if (!message) {
    return null
  }

  return (
    <div className={`flash-message flash-message--${message.type}`}>{message.text}</div>
  )
}

export default FlashMessage
