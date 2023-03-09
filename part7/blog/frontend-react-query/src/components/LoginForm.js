import { useState } from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { useAddFlashMessage } from '../contexts/flashMessage'
import { useLogin } from '../contexts/authUser'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const addFlashMessage = useAddFlashMessage()
  const login = useLogin()

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      await login({ username, password })
      addFlashMessage('Succeessfully logged in!')
    } catch (e) {
      addFlashMessage(e.response.data.error, 'error')
    }
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
