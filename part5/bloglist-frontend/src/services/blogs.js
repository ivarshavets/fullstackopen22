import axios from 'axios'
import { BASE_URL } from '../config'
import { token } from './user'

const fetchBlogs = () => {
  const request = axios.get(`${BASE_URL}/blogs`, {headers: { Authorization: token }})
  return request.then(response => response.data)
}

const postBlog = (data) => {
  return axios.post(`${BASE_URL}/blogs`, data, {headers: { Authorization: token }})
    .then(response => response.data)
}

const patchBlog = (data, id) => {
  return axios.patch(`${BASE_URL}/blogs/${id}`, data, {headers: { Authorization: token }})
    .then(response => response.data)
}

const blogService = {
  fetchBlogs,
  postBlog,
  patchBlog
}

export default blogService
