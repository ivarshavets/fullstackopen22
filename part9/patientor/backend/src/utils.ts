import { NewPatient } from "./types";

//parsing and validating each field of the object in a POST request
export const toNewPatientEntry = (object: unknown) => {
  //fake the func; to be implemented later
  console.log(object)
  const newEntry: NewPatient = {
    "name": "John McClane",
    "dateOfBirth": "1986-07-09",
    "ssn": "090786-122X",
    "gender": "male",
    "occupation": "New york city cop"
  };

  return newEntry
}
