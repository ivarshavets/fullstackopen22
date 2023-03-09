import Alert from '@mui/material/Alert'
import { useContext } from 'react'
import FlashMessageContext from '../contexts/flashMessage'

const FlashMessage = () => {
  const [message, , closeMessage] = useContext(FlashMessageContext)

  if (!message) {
    return null
  }

  return (
    <Alert className="flash_message" severity={message.type} onClose={closeMessage}>
      {message.text}
    </Alert>
  )
}

export default FlashMessage
