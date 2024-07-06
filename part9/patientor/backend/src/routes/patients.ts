import express from "express";
import patientsService from "../services/patientsService";
import { parsePatientEntry } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries())
});

router.get('/:id', (req, res) => {
  const result = patientsService.findById(req.params.id)
  if (result) {
    res.send(result)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', (req, res) => {
  try {
    // assuring that the object in a POST request has the correct type
    const newPatient = parsePatientEntry(req.body)

    const addedPatient = patientsService.addEntry(newPatient)
    res.json(addedPatient)
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong: '

    // since error object is of type unknown, we narrow the type to access the field with instanceof
    if (error instanceof Error) {
      errorMessage += error.message;
      res.status(400).send(errorMessage)
    }
  }
})

export default router;
