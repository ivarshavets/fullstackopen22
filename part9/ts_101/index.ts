// import express = require('express'); // combined method of importing, depends on the module tsconfig
import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';
import {isNotNumber} from './utils';

const app = express();

app.use(express.json()); // enables express to use json-parser as a middleware

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {height, weight} = req.query;

  if (!height || isNotNumber(height) || !weight || isNotNumber(weight)  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const parsedWeight = Number(weight);
  const parsedHeight = Number(height);

  const response = {
    weight: parsedWeight,
    height: parsedHeight,
    bmi: calculateBmi(parsedHeight, parsedWeight)
  };

  return res.send(response);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;

  if (!target || !daily_exercises) {
    return res.send({
      error: 'parameters missing'
    }).status(400);
  }

  if(isNotNumber(target)) {
    return res.send({
      error: 'malformatted parameters'
    }).status(400);
  }

  // assert the type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const days = daily_exercises as any[];

  for (const day of days) {
    if ( isNotNumber(day)) {
      return res.send({ error: "malformatted parameters" });
    }
  }

  const parsedDays = days.map(d => Number(d));
  const parsedTarget = Number(target);


  const response = calculateExercises(parsedDays, parsedTarget);
  return res.send(response);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
