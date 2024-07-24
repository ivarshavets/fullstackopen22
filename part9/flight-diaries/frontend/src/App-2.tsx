import { useEffect, useState } from 'react'
import './App.css'
import { getFlights, postFlight } from './api/flightDiaries'
import { Flight, NewFlightEntry } from './types'
import { parseFlightsEntry } from './utils'
import AddFlightForm from './components/AddFlightForm'


const App = () => {
  const [data, setData] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const addFlight = async (values: NewFlightEntry) => {
    try {
      const newFlight = await postFlight(values)
      setData(data.concat(newFlight))
    } catch(error: unknown) {
      if (error instanceof Error) {
        console.log(error)
      }
    }
  }

  // // promise approach
  // useEffect(() => {
  //   setIsLoading(true)
  //   fetchFlights()
  //       .then((data) => {
  //         setData(data)})
  //       .catch((error: unknown) => {
  //         if(error instanceof Error) {
  //           // show error notification
  //           setIsError(true)
  //         }
  //       })
  //       .finally(() => {
  //         setIsLoading(false)
  //         setIsError(false)
  //       }
  //     )
  // }, [])

  // async/await approach
  useEffect(() => {
    const fetchFlights = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const data = await getFlights<Flight[]>()
        const parsedData = data.map(obj => parseFlightsEntry(obj))
        setData(parsedData)
        setIsLoading(false)
      } catch (error:unknown) {
          if(error instanceof Error) {
            setIsError(true)
          }
      }
      setIsLoading(false)
    }

    fetchFlights()
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
      <h2>Add a flight entry</h2>
      <h2>Flight diary entries</h2>
      <AddFlightForm onSubmit={addFlight} />
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
