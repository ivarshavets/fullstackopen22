import PropTypes from 'prop-types'
import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = (e) => {
    e.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={submitForm}>
      <input
        className="username"
        type="text"
        name="username"
        value={username}
        onChange={({ target: { value } }) => setUsername(value)}
        placeholder="Username"
      />
      <input
        className="password"
        type="password"
        name="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        placeholder="Password"
      />
      <button className="login_btn" type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
