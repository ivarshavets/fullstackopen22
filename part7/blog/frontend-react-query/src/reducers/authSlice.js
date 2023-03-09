import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/userSorage'
import authService from '../services/auth'
import { showFlashMessage } from './flashMessageSlice'

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setUser(_state, { payload }) {
      return payload
    }
  }
})

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await authService.loginRequest(credentials)
      userService.setUserToLocalStorage(response.data)
      dispatch(setUser(response.data))
    } catch (error) {
      dispatch(showFlashMessage(error.response.data.error, 'error'))
    }
  }
}

export const { setUser } = authSlice.actions
export default authSlice.reducer
