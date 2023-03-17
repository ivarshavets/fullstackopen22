import axios from 'axios'
import { BASE_URL } from '../config'

const fetchAllUsers = () => axios.get(`${BASE_URL}/users`).then((response) => response.data)

const fetchUser = (id) => axios.get(`${BASE_URL}/users/${id}`).then((response) => response.data)

const userService = {
  fetchAllUsers,
  fetchUser
}

export default userService
