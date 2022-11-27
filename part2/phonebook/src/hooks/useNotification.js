import { useState } from "react"

const useFlashNotification = () => {
  const [flashMessage, setFlashMessage] = useState(null)

  const showFlashMessage = (text, type = 'success') => {
    setFlashMessage({text, type})
    setTimeout(() => {
      setFlashMessage(null)
    }, 5000)
  }

  return [flashMessage, showFlashMessage]
}

export default useFlashNotification
