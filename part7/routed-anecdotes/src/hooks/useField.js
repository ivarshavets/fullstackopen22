import { useState } from 'react'

export const useField = ({type, initialValue = ''}) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e) => setValue(e.target.value)

  const onReset = () => setValue('')

  return {
    type,
    value,
    onChange,
    onReset
  }

  // // alternative structure
  // return {
  //   onReset,
  //   fields: {
  //     type,
  //     value,
  //     onChange
  //   }
  // }
}
