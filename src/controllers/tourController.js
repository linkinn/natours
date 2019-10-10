const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    return res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  } catch (error) {
    return res.status(404).json({ status: 'fail', message: error });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    return res.status(200).json({ status: 'success', data: { tour } });
  } catch (error) {
    return res.status(404).json({ status: 'fail', message: error });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    return res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: error });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({ status: 'success', data: { tour } });
  } catch (error) {
    return res.status(404).json({ status: 'fail', message: error });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    return res.status(204).json({ status: 'success' });
  } catch (error) {
    return res.status(404).json({ status: 'fail', message: error });
  }
};
