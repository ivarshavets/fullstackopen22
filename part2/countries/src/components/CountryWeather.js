import axios from 'axios'
import { useState, useEffect } from 'react'
import { WEATHER_URL, WEATHER_ICON_URL } from './../config'

const CountryWeather = ({coord: {latlng: [lat, lng]}}) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    axios.get(`${WEATHER_URL}&lat=${lat}&lon=${lng}`)
      .then(({data}) => setWeather(data))

  }, [lat, lng])

  if (!weather) {
    return 'Not available'
  }

  return (
    <div>
      <p><img src={`${WEATHER_ICON_URL}/${weather.weather[0].icon}@2x.png`} alt='weather'/></p>
      <p>Temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius, {weather.weather[0].description}</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default CountryWeather
