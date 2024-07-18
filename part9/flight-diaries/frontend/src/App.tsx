import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

const URL = 'http://localhost:3000/api'

// types
interface Flight {
  id: string,
  date: string,
  weather: string,
  visibility: string
}

//api
const getFlights = async () => await axios.get(`${URL}/diaries`)
// const getFlights = () => axios.get(`${URL}/diaries`)

const fetchFlights = async () => {
  try {
    return getFlights().then((result) => {
      return result.data
    })
  } catch(error:unknown) {
    if(error instanceof Error) {
      console.log(error)
    }
  }
}

const App = () => {
  const [data, setData] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchFlights()
        .then((data) => {
          setData(data)})
        .catch((error: unknown) => {
          if(error instanceof Error) {
            // show error notification
            setIsError(true)
          }
        })
        .finally(() => {
          setIsLoading(false)
          setIsError(false)
        }
      )
  }, [])

  if (!data) {
    return <div>No flights</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Something went wrong</div>
  }

  return (
    <div>
      <h2>Flight diary entries</h2>
      <ul>
        {data.map(({id, date, weather, visibility}) => {
          return (
            <li key={id}>
              <div><strong>{date}</strong></div>
              <div>{weather}</div>
              <div>{visibility}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
