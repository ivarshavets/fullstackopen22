import express from 'express';
// const express = require('express');
import cors from 'cors';

import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(cors())
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
