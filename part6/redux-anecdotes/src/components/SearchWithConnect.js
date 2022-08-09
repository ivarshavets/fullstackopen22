import _debounce from 'lodash/debounce'
import { connect } from 'react-redux'
import { searchAnecdote } from '../reducers/searchReducer'

const Search = ({searchAnecdote}) => {
  const handleChange = _debounce(({target: {value}}) => {
    searchAnecdote(value)
  }, 400)

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Search by query
      <input
        type="text"
        onChange={handleChange}
      />
    </div>
  )
}

// mapDispatchToProps defined as an object
const mapDispatchToProps = {
  searchAnecdote
}

export default connect(null, mapDispatchToProps)(Search)
