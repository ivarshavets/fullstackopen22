import express from "express";
import patientsService from "../services/patientsService";

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
  const {body} = req
  const newEntry = patientsService.addEntry(body)
  res.json(newEntry)
})

export default router;
