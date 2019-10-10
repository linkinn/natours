const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

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
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
