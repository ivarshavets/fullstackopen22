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
