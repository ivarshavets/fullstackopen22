import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import userService from '../services/user'
// import authService from '../services/auth'
// import { setUser } from '../reducers/userSlice'
// import { showFlashMessage } from '../reducers/flashMessageSlice'

import { login } from '../reducers/userSlice'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (credentials) => {
    dispatch(login(credentials))
  }

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
      <button className="login_btn" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
