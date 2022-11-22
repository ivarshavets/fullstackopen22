const FlashMessage = ({message}) => {
  if (!message?.text) {
    return null
  }

  return (
    <div className={`flash-message flash-message--${message.type}`}>{message.text}</div>
  )
}

export default FlashMessage
