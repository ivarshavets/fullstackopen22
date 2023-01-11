import PropTypes from 'prop-types'

const FlashMessage = ({ message }) => {
  if (!message?.text) {
    return null
  }

  return (
    <div
      className={`flash_message flash-message flash-message--${message.type}`}
    >
      {message.text}
    </div>
  )
}

FlashMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.string
  })
}

export default FlashMessage
