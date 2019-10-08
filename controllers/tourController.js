const fs = require('fs');
const path = require('path');

const tours = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '..', 'dev-data', 'data', 'tours-simple.json')
  )
);

exports.getAllTours = (req, res) => {
  return res.status(200).json({
    status: 'success',
    date: req.requestTime,
    results: tours.length,
    data: { tours }
  });
};

exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find(e => e.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'Fail', msg: 'Invalid ID' });
  }

  return res.status(200).json({ status: 'success', data: { tour } });
};

exports.createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id, ...req.body };

  tours.push(newTour);

  fs.writeFile(
    path.resolve(__dirname, '..', 'dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(tours),
    err => {
      return res
        .status(201)
        .json({ status: 'success', data: { tour: newTour } });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length - 1) {
    return res.status(404).json({ status: 'Fail', msg: 'Invalid ID' });
  }

  return res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here...>' } });
};

exports.deleteTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length - 1) {
    return res.status(404).json({ status: 'Fail', msg: 'Invalid ID' });
  }

  return res.status(204).json({ status: 'success', data: null });
};
