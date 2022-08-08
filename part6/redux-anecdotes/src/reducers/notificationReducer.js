import { createSlice } from '@reduxjs/toolkit'

export const initialState = {message: '', type: 'success'}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(_state, action){
      return action.payload
    },
    removeNotification(_state){
      return initialState
    }}
  }
)

export const { showNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer

// Notification with logic in thunk action creator
let timeoutId = null

export const createNotificationAsyncThunk = ({message, type = 'success', hideDelay = 5}) => dispatch => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  dispatch(showNotification({message, type}))

  timeoutId = setTimeout(() => {
    dispatch(removeNotification())
  }, hideDelay * 1000)

}
