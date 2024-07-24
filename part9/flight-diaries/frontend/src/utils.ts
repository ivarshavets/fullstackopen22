import { Flight, Weather, Visibility } from "./types";

// Type guards
const isString = (value:unknown):value is string => {
  return typeof value === 'string' || value instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isWeather = (value: string): value is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(value);
};

const isVisibility = (value:string): value is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(value);
}

// const parseString = (value: unknown, what: string): string => {
//   if ( isString(value)) {
//     return value;
//   }
//   throw new Error(`Value of ${what} is incorrect: ${value}`);
// };

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number
}

const parseNumber = (value: unknown): number => {
  if ( isNumber(value)) {
    return value;
  }
  throw new Error(`Value of number is incorrect: ${value}`);
};

const parseDate = (value: unknown): string => {
  if (!isString(value) || !isDate(value)) {
      throw new Error(`Value of date is incorrect: ${value}`);
  }
  return value;
};

const parseWeather= (value: unknown): Weather => {
  if (!isString(value) || !isWeather(value)) {
      throw new Error(`Value of gender incorrect: ${value}`);
  }
  return value;
};

const parseVisibility= (value: unknown): Visibility => {
  if (!isString(value) || !isVisibility(value)) {
      throw new Error(`Value of gender incorrect: ${value}`);
  }
  return value;
};

//parsing and validating each field of the object in a GET response.data
export const parseFlightsEntry = (object: unknown): Flight => {
  // type narrowing to use object param
  // type guard to check if object is of needed type
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  // type guard to ensure Object has all needed fields
  if (!('id' in object)) throw new Error('Incorrect or missing data')
  if (!('date' in object)) throw new Error('Date is missing')
  if (!('weather' in object)) throw new Error('Weather is missing')
  if (!('visibility' in object)) throw new Error('Visibility is missing')

  return {
    id: parseNumber(object.id),
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility)
  }
}
