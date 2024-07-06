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
  return patients.map((patient) => ({
    ...patient, ssn: undefined
  }))
}

const findById = (id: string):Patient | undefined => {
  return patients.find((patient) => id === patient.id)
}

const addEntry = (patient:NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid()
  }
  patients.push(newPatient)
  return newPatient
}

const patientsService = {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addEntry
  };

  export default patientsService;
