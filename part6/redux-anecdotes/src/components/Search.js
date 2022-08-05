import _debounce from 'lodash/debounce'
import { useDispatch } from 'react-redux'
import { searchAnecdote } from '../reducers/searchReducer'

const Search = () => {
  const dispatch = useDispatch()

  const handleChange = _debounce(({target: {value}}) => {
    dispatch(searchAnecdote(value))
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

export default Search
