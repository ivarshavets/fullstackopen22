import { useState } from 'react'

export const useFormField = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    fields: {
      value,
      onChange
    },
    reset
  }
}
