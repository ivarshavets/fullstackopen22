import {useState, useEffect} from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { STORAGE_KEY } from '../utils'

const LoginForm = ({setToken, setError, navigateTo}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      navigateTo('books')
      localStorage.setItem(STORAGE_KEY, token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label>Username</label>
        <input
          value={username}
          onChange={({target: {value}}) => {setUsername(value)}}
          name="username"
          type="text"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          value={password}
          onChange={({target: {value}}) => {setPassword(value)}}
          name="password"
          type="password"
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm
