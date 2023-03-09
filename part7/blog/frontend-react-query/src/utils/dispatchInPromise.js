// export const dispatchInPromise = (dispatch, action, data = {}, {ignoreReject} = {}) => {
//   const prms = new Promise((resolve, reject) => {
//     dispatch(
//       action({
//         ...data,
//         resolve,
//         reject
//       })
//     )
//   })

//   if (ignoreReject) {
//     return prms.catch(() => {})
//   }

//   return prms
// }

export const dispatchInPromise = (dispatch, action, data) => {
  return new Promise((resolve, reject) => {
    dispatch(action(data, resolve, reject))
  })
}
