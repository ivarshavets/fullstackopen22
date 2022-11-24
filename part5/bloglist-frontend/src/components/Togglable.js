import { useState } from "react"

const Togglable = ({buttonText, children}) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((v) => !v)
  }

  const showWhenVisible = { display: isVisible ? '' : 'none' }

  const label = isVisible ? 'Hide' : buttonText

  return (
    <div>
      <button onClick={toggleVisibility}>{label}</button>
      <div style={showWhenVisible}>
        {children}
      </div>
    </div>
  )
}

export default Togglable
