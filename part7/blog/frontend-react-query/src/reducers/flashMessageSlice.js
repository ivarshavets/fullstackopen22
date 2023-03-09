import { createSlice } from '@reduxjs/toolkit'

const FlashMessageSlice = createSlice({
  name: 'flashMessage',
  initialState: null,
  reducers: {
    setFlashMessage(_state, { payload }) {
      return payload
    },
    clearFlashMessage() {
      return null
    }
  }
})

export const showFlashMessage = (text, type = 'success') => {
  return async (dispatch) => {
    dispatch(setFlashMessage({ text, type }))
    const timer = setTimeout(() => {
      dispatch(clearFlashMessage())
      clearTimeout(timer)
    }, 5000)
  }
}

export const { setFlashMessage, clearFlashMessage } = FlashMessageSlice.actions
export default FlashMessageSlice.reducer
