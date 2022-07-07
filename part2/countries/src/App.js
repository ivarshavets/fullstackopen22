import { useState, useEffect, useCallback, useMemo } from 'react'
import axios from 'axios'
import { useDebouncedCallback } from 'use-debounce'
import { COUNTRIES_URL } from './config'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect( () => {
    axios.get(COUNTRIES_URL).then(({data}) => setCountries(data))
  }, [])

  const getFilteredCountries = useCallback((query) =>
    !query ? [] : countries.filter(({name: {common, official}}) =>
      common.toLowerCase().includes(query.toLowerCase()) ||
      official.toLowerCase().includes(query.toLowerCase())
  ), [countries])

  const handleSearch = useDebouncedCallback((query) => {
    setFilteredCountries(getFilteredCountries(query))
  }, [400])

  const content = useMemo(() => {
    if (!filteredCountries.length) {
      return <p>Nothing is found</p>
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />
    }

    return <Countries countries={filteredCountries} />
  }, [filteredCountries])

  return (
    <div className="container">
      <h1>Countries</h1>
      <input
        type="search"
        placeholder="Fill in the country name"
        onChange={(e) => handleSearch(e.target.value)}
      />
     <div>{content}</div>
    </div>
  )
}

export default App
