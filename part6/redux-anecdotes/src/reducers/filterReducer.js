// actions
const SET_FILTER = 'SET_FILTER'

//action creators
export const setFilter = filter => ({
  type: SET_FILTER,
  payload: filter
})

//reducer
const filterReducer = (state = 'ALL', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case SET_FILTER:
      return action.payload
    default:
      return state
  }
}

export default filterReducer
