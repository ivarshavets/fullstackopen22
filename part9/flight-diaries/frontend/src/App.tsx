import axios from 'axios'
import { useEffect, useState, SyntheticEvent } from 'react'
import './App.css'
import { getFlights, postFlight } from './api/flightDiaries'
import { Flight, NewFlightEntry, Visibility, Weather } from './types'
import { parseFlightsEntry } from './utils'

const App = () => {
  const [data, setData] = useState<Flight[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather|''>('')
  const [visibility, setVisibility] = useState<Visibility|''>('')
  const [comment, setComment] = useState('')

  const weatherOptions = Object.values(Weather);
  const visibilityOptions = Object.values(Visibility);

  const notify = (message: string) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!weather || !visibility) {
      notify('Weather or visibility is missing')
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
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <span>Weather:</span>
          {weatherOptions.map((value) => (
            <span key={value}>
              <label>{value}</label>
              <input
                type="radio"
                name="weather"
                value={value}
                checked={value === weather}
                onChange={() => setWeather(value)}
                style={{marginRight: 10}}
              />
            </span>
          ))}
        </div>
        <div>
          <span>Visibility:</span>
          {visibilityOptions.map((value) => (
            <span key={value}>
              <label>{value}</label>
              <input
                type="radio"
                name="visibility"
                value={value}
                checked={value === visibility}
                onChange={() => setVisibility(value)}
                style={{marginRight: 10}}
              />
            </span>
          ))}
        </div>
        <div>
          <label>Comment:</label>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={({target}) => setComment(target.value)}
          />
         </div>
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
