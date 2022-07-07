import {useState} from 'react'
import Button from './Button'
import Country from './Country'

const CountriesListItem = ({item}) => {
  const {name: {common, official}} = item

  const [isShown, setIsShown] = useState()

  return (
    <>
      {`${common} (official: ${official}) `}
      <Button onClick={() => setIsShown(!isShown)}>
        {isShown ? 'Hide' : 'Show'}
      </Button>
      {isShown && <Country country={item} />}
      <hr />
    </>
  )
}

const Countries = ({countries}) =>
  countries.map(item => <CountriesListItem key={item.name.common} item={item} />)

export default Countries
