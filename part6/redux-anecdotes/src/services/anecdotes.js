import axios from 'axios'
import { BASE_URL } from '../config'

export const getAnacdotesApiCall = () => {
  return axios.get(`${BASE_URL}/anecdotes`)
}

export const postAnecdoteApiCall = (data) => {
  return axios.post(`${BASE_URL}/anecdotes`, data)
}
