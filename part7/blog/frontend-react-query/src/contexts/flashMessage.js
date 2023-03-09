import { createContext, useReducer, useContext } from 'react'

const SET = 'SET'
const CLEAR = 'CLEAR'

const setFlashMessage = (payload) => ({
  type: SET,
  payload
})

const clearFlashMessage = () => ({
  type: CLEAR,
  payload: null
})

const reducer = (state, action) => {
  switch (action.type) {
    case SET:
      return action.payload
    case CLEAR:
      return null
    default:
      return state
  }
}

const FlashMessageContext = createContext()

export const FleshMessageContextProvider = ({ children }) => {
  const [message, messageDispatch] = useReducer(reducer, null)

  const addMessage = (text, type = 'success') => {
    messageDispatch(setFlashMessage({ text, type }))
    const timer = setTimeout(() => {
      closeMessage()
      clearTimeout(timer)
    }, 5000)
  }

  const closeMessage = () => messageDispatch(clearFlashMessage())

  return (
    <FlashMessageContext.Provider value={[message, addMessage, closeMessage]}>
      {children}
    </FlashMessageContext.Provider>
  )
}

export const useFlashMessageValue = () => {
  return useContext(FlashMessageContext)[0]
}

export const useAddFlashMessage = () => {
  return useContext(FlashMessageContext)[1]
}

export const useCloseFlashMessage = () => {
  return useContext(FlashMessageContext)[2]
}

export default FlashMessageContext
