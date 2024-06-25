// import express = require('express'); // combined method of importing, depends on the module tsconfig
import express from 'express';
import {calculateBmi} from './bmiCalculator'
import {isNotNumber} from './utils'

const app = express();

app.use(express.json()); // enables express to use json-parser as a middleware

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query

  if (!height || isNotNumber(height) || !weight || isNotNumber(weight)  ) {
    return res.send({ error: "malformatted parameters" });
  }

  const parsedWeight = Number(weight)
  const parsedHeight = Number(height)

  const response = {
    weight: parsedWeight,
    height: parsedHeight,
    bmi: calculateBmi(parsedHeight, parsedWeight)
  };

  return res.send(response);
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
