import axios from 'axios'
import { BASE_URL } from '../config'

const USER_LOCAL_STORAGE_KEY = 'authenticatedBlogAppUser'

let token = null

const setToken = (newToken) => {
  token = newToken
  axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
}

const getToken = () => token

const getUserFromLocalStorage = () => {
  const authenticatedUser = window.localStorage.getItem(USER_LOCAL_STORAGE_KEY)
  if (!authenticatedUser) {
    return null
  }
  const parsedUser = JSON.parse(authenticatedUser)
  setToken(parsedUser.token)
  return parsedUser
}

const setUserToLocalStorage = (data) => {
  window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data))
  setToken(data.token)
}

const deleteUserFromLocalStorage = () => {
  window.localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
  setToken(null)
}

const fetchAllUsers = () => axios.get(`${BASE_URL}/users`)

const fetchUser = (id) => axios.get(`${BASE_URL}/users/${id}`)

const userService = {
  getToken,
  setToken,
  getUserFromLocalStorage,
  setUserToLocalStorage,
  deleteUserFromLocalStorage,
  fetchUser,
  fetchAllUsers
}

export default userService
