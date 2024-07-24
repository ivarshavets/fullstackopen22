import axios from 'axios'
import { useEffect, useState, SyntheticEvent } from 'react'
import './App.css'
import { getFlights, postFlight } from './api/flightDiaries'
import { Flight, NewFlightEntry, Visibility, Weather } from './types'
import { isWeather, parseFlightsEntry } from './utils'

const App = () => {
  const [data, setData] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather|''>('')
  const [visibility, setVisibility] = useState<Visibility|''>('')
  const [comment, setComment] = useState('')

  const notify = (message: string) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!weather || !visibility || !isWeather(weather)) {
      notify('Weather or visibility is missing or not correct')
      return
    }

    const newData: NewFlightEntry = {
      date,
      comment,
      weather,
      visibility
    }

    try {
      const newFlight = await postFlight(newData)
      setData(data.concat(newFlight))
    } catch(error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response && error.response.data
          ? error.response.data.replace('Something went wrong. ','')
          : 'Addition failed, reason unknown...'
        notify(message)
      } else {
        console.error(error)
      }
    }

    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
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
        if (axios.isAxiosError(error)) {
          setIsError(true)
        } else {
          console.error(error)
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
      {error && <div style={{ color: 'red', marginBottom: 10} }>{error}</div>}
      <h2>Add a flight entry</h2>
      <form onSubmit={submitForm}>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          name="weather"
          value={weather}
          onChange={(e) => setWeather(e.target.value as Weather)}
        />
        <input
          type="text"
          name="visibility"
          value={visibility}
          onChange={({target}) => setVisibility(target.value as Visibility)}
        />
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={({target}) => setComment(target.value)}
        />
        <button type='submit'>Add</button>
      </form>
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
