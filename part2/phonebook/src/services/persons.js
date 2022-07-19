import axios from 'axios'
import { BASE_URL } from '../config'

const getPersons = () => {
  return axios.get(`${BASE_URL}/persons`)
}

const addPerson = (data) => axios.post(`${BASE_URL}/persons`, data)

const updatePerson = (id, data) => axios.patch(`${BASE_URL}/persons/${id}`, data)

const deletePerson = (id) => axios.delete(`${BASE_URL}/persons/${id}`)

const personsService = {
  getPersons,
  addPerson,
  updatePerson,
  deletePerson
}

export default personsService
