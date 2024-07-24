import { useState } from "react";
import { NewFlightEntry } from "../types";

interface Props {
  // onCancel: () => void;
  onSubmit: (values: NewFlightEntry) => void;
}

const AddFlightForm = ({onSubmit}: Props) => {
  const initialFormValues = {
    date: '',
    weather: '',
    visibility: '',
    comment: ''
  }
  const [formValues, setFormValues] = useState(initialFormValues)

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const addFlight = (e: React.SyntheticEvent) => {
    e.preventDefault()
    // todo: type guard for newData
    onSubmit(newData)
    setFormValues(initialFormValues)
  }

  return (
    <form onSubmit={addFlight}>
      <input
        type="date"
        name="date"
        value={formValues.date}
        onChange={(e) => onInputChange(e)}
      />
      <input
        type="text"
        name="weather"
        value={formValues.weather}
        onChange={(e) => onInputChange(e)}
      />
      <input
        type="text"
        name="visibility"
        value={formValues.visibility}
        onChange={(e) => onInputChange(e)}
      />
      <button type='submit'>Add</button>
    </form>
  )
}

export default AddFlightForm
