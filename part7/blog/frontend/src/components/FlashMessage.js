import { useSelector, useDispatch } from 'react-redux'
import Alert from '@mui/material/Alert'
import { clearFlashMessage } from '../reducers/flashMessageSlice'

const FlashMessage = () => {
  const message = useSelector(({ flashMessage }) => flashMessage)

  const dispatch = useDispatch()

  const closeMessage = () => dispatch(clearFlashMessage())

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
