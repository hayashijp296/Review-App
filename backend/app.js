const express = require('express');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/error');
require('express-async-errors');
require('./db');
const userRouter = require('./routes/user');

/* Creating a server and listening on port 8000. */
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user', userRouter);

app.use(errorHandler);

app.listen(8000, () => {
  console.log('The port is listening on port 8000');
});
