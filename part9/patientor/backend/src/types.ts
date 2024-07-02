export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface  Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string
  gender: Gender,
  occupation: string
}

type Gender = "female" | "male" | "other";

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
