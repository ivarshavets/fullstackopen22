import { useCallback, useState } from 'react'

export const useToggle = (initialValue = false) => {
  const [isVisible, setIsVisible] = useState(initialValue)

  const toggleVisibility = useCallback(() => {
    setIsVisible((v) => !v)
  }, [])

  const resetValue = useCallback(() => {
    setIsVisible(initialValue)
  }, [initialValue])

  return [isVisible, toggleVisibility, resetValue]
}
