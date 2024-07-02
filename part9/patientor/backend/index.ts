import express from 'express';
// const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
