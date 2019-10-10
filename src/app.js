const express = require('express');
const morgan = require('morgan');
const { resolve } = require('path');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(resolve(__dirname, '..', 'public')));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
