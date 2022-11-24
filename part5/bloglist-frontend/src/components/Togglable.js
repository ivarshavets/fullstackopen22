import { forwardRef, useState, useImperativeHandle } from 'react'

const Togglable = forwardRef(({buttonText, children}, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((v) => !v)
  }

  const showWhenVisible = { display: isVisible ? '' : 'none' }

  const label = isVisible ? 'Hide' : buttonText
  
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <button onClick={toggleVisibility}>{label}</button>
      <div style={showWhenVisible}>
        {children}
      </div>
    </div>
  )
})

export default Togglable
