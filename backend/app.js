const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middlewares/error');
require('express-async-errors');
require('./db');
const userRouter = require('./routes/user');
const actorRouter = require('./routes/actor');
const { handleNotFound } = require('./utils/helper');

/* Creating a server and listening on port 8000. */
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user', userRouter);
app.use('/api/actor', actorRouter);

app.use('/*', handleNotFound);

app.use(errorHandler);

app.listen(8000, () => {
  console.log('The port is listening on port 8000');
});
