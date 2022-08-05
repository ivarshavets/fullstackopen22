import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: null,
  reducers: {
    searchAnecdote(_state, {payload}) {
      return payload
    }
  }
})

export const { searchAnecdote } = searchSlice.actions
export default searchSlice.reducer
