import { useDispatch } from 'react-redux'
import { setFilter } from './../reducers/filterReducer'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  const filterSelected = (filter) => dispatch(setFilter(filter))

  return (
    <div>
      <h4>Visibility Filter</h4>
      <label>
        All
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected('ALL')}
          defaultChecked={true}
        />
      </label>
      <label>
        Important
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected('IMPORTANT')}
        />
      </label>
      <label>Non important
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected('NONIMPORTANT')}
        />
      </label>
    </div>
  )
}

export default VisibilityFilter
