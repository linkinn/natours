const express = require('express');
const morgan = require('morgan');
const { resolve } = require('path');

const app = express();

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(resolve(__dirname, '..', 'public')));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
