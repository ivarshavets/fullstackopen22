import axios from 'axios'
import { URL } from '../config'

export const getFlights = () => axios.get(`${URL}/diaries`)

// // promise approach
// const fetchFlights = () => {
//   return getFlights()
//     .then((result) => {
//       return result.data
//     })
//     .catch((error:unknown) => {
//       if(error instanceof Error) {
//         console.log(error)
//       }
//     })
// }

// // async/await approach
// const fetchFlights = async () => {
//   try {
//     const result = await getFlights()
//     return result
//   } catch (error:unknown) {
//       if(error instanceof Error) {
//         console.log(error)
//       }
//   }
// }
