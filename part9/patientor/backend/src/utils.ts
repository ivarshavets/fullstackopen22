import { NewPatient, Gender } from "./types";

// Type guards
const isString = (text: unknown):text is string => {
  return typeof text === 'string' || text instanceof String;
  //using two condition since there are two ways to create string, one as a primitive and the other as an object
  // const a = "I'm a string primitive";
  // const b = new String("I'm a String Object");
  // typeof a; --> returns 'string'
  // typeof b; --> returns 'object'
  // a instanceof String; --> returns false
  // b instanceof String; --> returns true
}

//can't use a type predicate based type guard here since a date in this case is only considered to be a string
const isDate = (date: string): boolean => {
  // check the date format
  return Boolean(Date.parse(date));
}

const isGender = (param:string):param is Gender => {
  // need to take the string representation of the enum values for the comparison, that is why we do the mapping.
  return Object.values(Gender).map(v => v.toString()).includes(param);
}

// Parsers for each of the fields of the parameter object
const parseName = (name: unknown):string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name')
  }
  return name;
}

const parseDateOfBirth = (date: unknown):string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date:' + date)
  }
  return date
}

const parseGender = (gender: unknown):Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender' + gender)
  }
  return gender
}


// const parseOccupation = (name: unknown):string => {}

//parsing and validating each field of the object in a POST request
export const toNewPatientEntry = (object: unknown): NewPatient => {
  // type narrowing to use object param
  // type guard to check if object is of needed type
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  // type guard to ensure Object has all needed fields
  if ('name' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: "090786-122X",
      gender: parseGender(object.gender),
      occupation: 'asdf'//parseOccupation(object.occupation)
    };

    return newEntry
  }
  throw new Error('Incorrect data: some fields are missing');
}
