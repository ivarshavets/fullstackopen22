import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient } from '../types';

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

const patientsService = {
  getEntries,
  getNonSensitiveEntries
  };

  export default patientsService;
