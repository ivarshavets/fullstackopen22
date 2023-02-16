import { createSlice, createAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
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
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    singleUserStatus: 'idle',
    singleUserError: null
  },
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
        state.singleUserStatus = 'loading'
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
        state.singleUserStatus = 'succedded'
        state.singleUserError = null
        state.list.push(action.payload)
      })
      .addCase(fetchUserByIdThunk.rejected, (state, action) => {
        state.singleUserStatus = 'failed'
        state.singleUserError = action.error.message
      })
  }
})

// Selectors
export const selectUserById = createSelector(
  ({ users }) => users.list,
  (_state, id) => id,
  (allUsers, id) => allUsers.filter((item) => item.id === id)[0]
)

// // Memoization with cache limit of two due to different user id as an argument
// import createCachedSelector from 're-reselect'
// export const selectUserById = createCachedSelector(
//   [selectAllUsers,
//   (_state, id) => id,],
//   (allUsers, id) => allUsers.filter((item) => item.id === id)[0]
// )((_state, id) => `users/${id}`)

export default usersSlice.reducer
