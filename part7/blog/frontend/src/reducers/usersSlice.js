import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import usersService from '../services/users'

// Action creator
const fetchAllUsers = createAction('users/fetchAllUsers')
const fetchUserById = createAction('users/fetchUserById')

// Thunk function
export const fetchAllUsersThunk = createAsyncThunk(fetchAllUsers, async () => {
  const response = await usersService.fetchAllUsers()
  return response.data
})

export const fetchUserByIdThunk = createAsyncThunk(
  fetchUserById,
  async (id) => await usersService.fetchUser(id).data
)

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllUsersThunk.fulfilled, (state, action) => {
        state.status = 'succedded'
        state.error = null
        state.list = action.payload
      })
      .addCase(fetchAllUsersThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchUserByIdThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
        state.status = 'succedded'
        state.error = null
        state.list.push(action.payload)
      })
      .addCase(fetchUserByIdThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default usersSlice.reducer
