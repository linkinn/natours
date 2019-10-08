const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, 'dev-data', 'data', 'tours-simple.json')
  )
);

app.get('/api/v1/tours', (req, res) => {
  return res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find(e => e.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'Fail', msg: 'Invalid ID' });
  }

  return res.status(200).json({ status: 'success', data: { tour } });
});

app.post('/api/v1/tours', (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id, ...req.body };

  tours.push(newTour);

  fs.writeFile(
    path.resolve(__dirname, 'dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(tours),
    err => {
      return res
        .status(201)
        .json({ status: 'success', data: { tour: newTour } });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length - 1) {
    return res.status(404).json({ status: 'Fail', msg: 'Invalid ID' });
  }

  return res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here...>' } });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length - 1) {
    return res.status(404).json({ status: 'Fail', msg: 'Invalid ID' });
  }

  return res.status(204).json({ status: 'success', data: null });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
