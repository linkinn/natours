const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 😡 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: path.resolve(__dirname, '..', 'config.env') });

const app = require('./app');

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLER REJECTION! 😡 Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
