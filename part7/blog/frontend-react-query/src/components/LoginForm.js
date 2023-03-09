import { useState } from 'react'
import { useDispatch } from 'react-redux'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { login } from '../reducers/authSlice'
import { useAddFlashMessage } from '../contexts/flashMessage'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const addFlashMessage = useAddFlashMessage()

  const handleLogin = (credentials) => {
    dispatch(login(credentials))
  }

  const submitForm = (e) => {
    e.preventDefault()
    handleLogin({ username, password })
    addFlashMessage('Succeessfully logged in!')
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={submitForm} autoComplete={'off'}>
      <TextField
        className="username"
        type="text"
        name="username"
        value={username}
        onChange={({ target: { value } }) => setUsername(value)}
        label="Username"
        fullWidth
        margin="normal"
      />
      <TextField
        className="password"
        type="password"
        name="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        label="Password"
        fullWidth
        margin="normal"
        sx={{ marginBottom: '2rem' }}
      />
      <Button className="login_btn" type="submit" size="large">
        Login
      </Button>
    </form>
  )
}

export default LoginForm
