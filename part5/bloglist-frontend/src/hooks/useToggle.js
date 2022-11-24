import { useCallback, useState } from 'react'

export const useToggle = (initial = false) => {
  const [isVisible, setIsVisible] = useState(initial)

  const toggleVisibility = useCallback(() => {
    setIsVisible((v) => !v)
  }, [])

  return [isVisible, toggleVisibility]
}
