import axios from 'axios'
import { URL } from '../config'
import { Flight, NewFlightEntry } from '../types'

// axios.get is a generic function. Unlike some generic functions, the type parameter of axios.get has a default value of any so, if the function is used without defining the type parameter, the type of the response data will be any.
export const getFlights = <T>() => axios.get<T>(`${URL}/diaries`)
  .then(({data}) => data)
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

export const postFlight = (data: NewFlightEntry) => axios.post<Flight[]>(`${URL}/diaries`, data)
  .then(response => response.data)
