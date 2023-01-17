import axios from 'axios'
import { BASE_URL } from '../config'
import { token } from './user'

const fetchBlogs = () => {
  const request = axios.get(`${BASE_URL}/blogs`, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const postBlog = (data) => {
  return axios.post(`${BASE_URL}/blogs`, data, { headers: { Authorization: token } })
    .then(response => response.data)
}

const patchBlog = (data, id) => {
  return axios.patch(`${BASE_URL}/blogs/${id}`, data, { headers: { Authorization: token } })
    .then(response => response.data)
}

const deleteBlog = (id) => {
  return axios.delete(`${BASE_URL}/blogs/${id}`, { headers: { Authorization: token } })
    .then(response => {
      // response.data is empty string
      return response.data
    })
}

const blogService = {
  fetchBlogs,
  postBlog,
  patchBlog,
  deleteBlog
}

export default blogService
