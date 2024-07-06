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
// const parseName = (name: unknown):string => {
//   // if (!name || !isString(name)) name fiels existance is checked in the object parser hense is not needed here
//   if (!isString(name)) {
//     throw new Error('Incorrect or missing name')
//   }
//   return name;
// }

const parseString = (value: unknown, what: string):string => {
  if ( isString(value)) {
    return value;
  }
  throw new Error(`Value of ${what} incorrect: ${value}`);
}
const parseDate = (date: unknown):string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date:' + date)
  }
  return date
}

const parseGender = (value: unknown):Gender => {
  if (!isString(value) || !isGender(value)) {
    throw new Error('Incorrect gender value' + value)
  }
  return value
}

//parsing and validating each field of the object in a POST request
export const parsePatientEntry = (object: unknown): NewPatient => {
  // type narrowing to use object param
  // type guard to check if object is of needed type
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  // type guard to ensure Object has all needed fields
  if ('name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatient = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation')
    };

    return newEntry
  }
  throw new Error('Incorrect data: some fields are missing');
}
