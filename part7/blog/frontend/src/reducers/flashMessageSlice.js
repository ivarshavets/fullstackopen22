import { createSlice } from '@reduxjs/toolkit'

const FlashMessageSlice = createSlice({
  name: 'flashMessage',
  initialState: null,
  reducers: {
    setFlashMessage(_state, { payload }) {
      return payload
    }
  }
})

export const showFlashMessage = (text, type = 'success') => {
  return async (dispatch) => {
    dispatch(setFlashMessage({ text, type }))
    setTimeout(() => {
      dispatch(setFlashMessage(null))
    }, 5000)
  }
}

export const { setFlashMessage } = FlashMessageSlice.actions
export default FlashMessageSlice.reducer
