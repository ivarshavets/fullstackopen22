import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import authService from '../services/auth'
import { showFlashMessage } from '../reducers/flashMessageSlice'

const userSlice = createSlice({
  name: 'user',
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
      dispatch(showFlashMessage('Succeessfully logged in!'))
    } catch (error) {
      dispatch(showFlashMessage(error.response.data.error, 'error'))
    }
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
