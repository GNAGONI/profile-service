require('express-async-errors');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { profileRouter } = require('./src/routes');
const { errorMiddleware } = require('./src/middlewares');
const { dbConnect } = require('./src/db');

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/profile', profileRouter);
app.use((req, res) => {
  res.status(404).send('Not Found');
});
app.use(errorMiddleware);

dbConnect(() => {
  app.listen(process.env.PROFILE_SERVICE_PORT, () => {
    console.log(
      `Server is running on port ${process.env.PROFILE_SERVICE_PORT}`,
    );
  });
});
