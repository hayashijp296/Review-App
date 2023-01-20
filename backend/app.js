const express = require('express');
require('./db');
const userRouter = require('./routes/user');

/* Creating a server and listening on port 8000. */
const app = express();
app.use(express.json());
app.use('/api/user', userRouter);

app.listen(8000, () => {
  console.log('The port is listening on port 8000');
});
