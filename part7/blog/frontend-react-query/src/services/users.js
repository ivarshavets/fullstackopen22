import axios from 'axios'
import { BASE_URL } from '../config'

const fetchAllUsers = () => axios.get(`${BASE_URL}/users`)

const fetchUser = (id) => axios.get(`${BASE_URL}/users/${id}`)

const userService = {
  fetchAllUsers,
  fetchUser
}

export default userService
