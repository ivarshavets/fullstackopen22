import { forwardRef, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ buttonText, children }, ref) => {
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

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
