const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('db is connected');
  })
  .catch((ex) => {
    console.log('db connection error', ex);
  });
