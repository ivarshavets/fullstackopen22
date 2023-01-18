import axios from 'axios'
import { BASE_URL } from '../config'

export let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const loginRequest = (credentials) => axios.post(`${BASE_URL}/login`, credentials)

const fetchUser = () => axios.get(`${BASE_URL}/users`, { headers: { Authentication: token } })

const userService = {
  fetchUser,
  loginRequest,
  setToken
}

export default userService
