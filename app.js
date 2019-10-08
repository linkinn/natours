const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, 'dev-data', 'data', 'tours-simple.json')
  )
);

const getAllTours = (req, res) => {
  return res
    .status(200)
    .json({
      status: 'success',
      date: req.requestTime,
      results: tours.length,
      data: { tours }
    });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find(e => e.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'Fail', msg: 'Invalid ID' });
  }

  return res.status(200).json({ status: 'success', data: { tour } });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length - 1) {
    return res.status(404).json({ status: 'Fail', msg: 'Invalid ID' });
  }

  return res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here...>' } });
};

const deleteTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length - 1) {
    return res.status(404).json({ status: 'Fail', msg: 'Invalid ID' });
  }

  return res.status(204).json({ status: 'success', data: null });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
