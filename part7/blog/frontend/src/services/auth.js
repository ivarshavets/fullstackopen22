import axios from 'axios'
import { BASE_URL } from '../config'

const loginRequest = (credentials) => axios.post(`${BASE_URL}/login`, credentials)

const authService = { loginRequest }

export default authService
