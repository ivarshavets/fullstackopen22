import axios from 'axios'
import { BASE_URL } from '../config'
// import userService from './user'

// const getConfig = () => {
//   return {
//     headers: {
//       Authorization: `Bearer ${userService.getToken()}`
//     }
//   }
// }

const fetchBlogs = () => {
  const request = axios.get(`${BASE_URL}/blogs`)
  return request.then((response) => response.data)
}

const fetchBlogById = (id) => {
  const request = axios.get(`${BASE_URL}/blogs/${id}`)
  return request.then((response) => response.data)
}

const postBlog = (data) => {
  return axios.post(`${BASE_URL}/blogs`, data).then((response) => response.data)
}

const patchBlog = (id, data) => {
  return axios.patch(`${BASE_URL}/blogs/${id}`, data).then((response) => response.data)
}

const deleteBlog = (id) => {
  return axios.delete(`${BASE_URL}/blogs/${id}`).then((response) => {
    // response.data is empty string
    return response.data
  })
}

const addBlogComments = (id, data) => {
  return axios.post(`${BASE_URL}/blogs/${id}/comments`, data).then((response) => response.data)
}

const blogService = {
  fetchBlogs,
  fetchBlogById,
  postBlog,
  patchBlog,
  deleteBlog,
  addBlogComments
}

export default blogService
