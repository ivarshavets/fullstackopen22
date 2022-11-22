import axios from 'axios'
import { BASE_URL } from '../config'
import { token } from './user'

const fetchBlogs = () => {
  const request = axios.get(`${BASE_URL}/blogs`, {headers: { Authorization: token }})
  return request.then(response => response.data)
}

const blogService = { fetchBlogs }

export default blogService
