// const FETCH = 'FETCH'

// const fetchAction = (payload) => ({
//   type: 'FETCH',
//   payload
// })

// const blogReducer = (state=[], action) => {
//   switch(action.type) {
//     case FETCH:
//       return action.payload
//     case ADD:
//       return
//     default:
//       return state
//   }
// }

// export default blogReducer

// const getRepoDetailsStarted = () => ({
//   type: 'repoDetails/fetchStarted'
// })
// const getRepoDetailsSuccess = repoDetails => ({
//   type: 'repoDetails/fetchSucceeded',
//   payload: repoDetails
// })
// const getRepoDetailsFailed = error => ({
//   type: 'repoDetails/fetchFailed',
//   error
// })
// const fetchIssuesCount = (org, repo) => async dispatch => {
//   dispatch(getRepoDetailsStarted())
//   try {
//     const repoDetails = await getRepoDetails(org, repo)
//     dispatch(getRepoDetailsSuccess(repoDetails))
//   } catch (err) {
//     dispatch(getRepoDetailsFailed(err.toString()))
//   }
// }
