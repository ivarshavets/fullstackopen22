import CountryWeather from "./CountryWeather"

const Country = ({
  country: {
    name: {common, official},
    region,
    capital,
    area,
    population,
    flags: {svg},
    languages,
    capitalInfo
  }
}) => (
  <div>
    <h1>{common}</h1>
    <h3>Official: {official}</h3>
    <p><strong>Capital</strong>: {capital}</p>
    <p><strong>Region</strong>: {region}</p>
    <p><strong>Area</strong>: {area}</p>
    <p><strong>Population</strong>: {population}</p>
    <p><strong>Capital</strong>: {capital}</p>
    <p><img alt={common} src={svg} width="150" height="100" /></p>
    <p><strong>Languages</strong>:</p>
    <ul>
      {Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)}
    </ul>
    <h3>Weather in {common}</h3>
    <CountryWeather coord={capitalInfo} />
  </div>
)

export default Country
