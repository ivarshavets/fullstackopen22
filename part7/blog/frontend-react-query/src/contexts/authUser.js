import { createContext, useReducer, useContext } from 'react'
import userService from '../services/userSorage'
import authService from '../services/auth'

const SET_USER = 'SET_USER'
const CLEAR_USER = 'CLEAR_USER'

const setUser = (payload) => ({
  type: SET_USER,
  payload
})

const clearUser = () => ({
  type: CLEAR_USER,
  payload: null
})

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    case CLEAR_USER:
      return null
    default:
      return state
  }
}

const AuthUserContext = createContext()

export const AuthUserContextProvider = ({ children }) => {
  const [authUser, dispatch] = useReducer(reducer, null)

  return (
    <AuthUserContext.Provider value={[authUser, dispatch]}>{children}</AuthUserContext.Provider>
  )
}

export const useAuthUser = () => {
  const [value] = useContext(AuthUserContext)

  return value
}

export const useLogin = () => {
  const [, dispatch] = useContext(AuthUserContext)

  return async (credentials) => {
    const user = await authService.loginRequest(credentials)
    dispatch(setUser(user.data))
    userService.setUserToLocalStorage(user.data)
  }
}

export const useLogout = () => {
  const [, dispatch] = useContext(AuthUserContext)

  return () => {
    dispatch(clearUser())
    userService.deleteUserFromLocalStorage()
  }
}

export const useInitUser = () => {
  const [, dispatch] = useContext(AuthUserContext)

  return () => {
    const user = userService.getUserFromLocalStorage()
    if (user) {
      dispatch(setUser(user))
    }
  }
}

export default AuthUserContextProvider
