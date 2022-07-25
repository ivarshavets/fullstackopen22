const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

// action creator function
export const voteAction = (voteType) => ({type: voteType})

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const good = state.good + 1
      return {...state, good}
    case 'OK':
      const ok = state.ok + 1
      return {...state, ok}
    case 'BAD':
      const bad = state.bad + 1
      return {...state, bad}
    case 'ZERO':
      return {...initialState}
    default: return state
  }

}

export default counterReducer
