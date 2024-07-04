import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

// // type assertion because we specified that the field gender has type Gender but TS inferred its type to be string
// const patients: Patient[] = patientsData as Patient[];

const patients: Patient[] = patientsData;

const getEntries = ():Patient[] => {
  return patients;
}

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const findById = (id: string):Patient | undefined => {
  return patients.find((patient) => id === patient.id)
}

const addEntry = (entry:NewPatient): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry
  }
  patients.push(newEntry)
  return newEntry
}

const patientsService = {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addEntry
  };

  export default patientsService;
