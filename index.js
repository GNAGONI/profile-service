require('express-async-errors');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { errorMiddleware } = require('@microservices-inc/common');
const { eventBus } = require('@microservices-inc/common');
const { profileRouter } = require('./src/routes');
const { sessionStorage } = require('./src/sessionStorage');

dotenv.config();

const app = express();
app.use(sessionStorage);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', profileRouter);
app.use((req, res) => {
  res.status(404).send('Not Found');
});
app.use(errorMiddleware);

eventBus.connect(process.env.RABBITMQ_URI, () => {
  app.listen(process.env.PROFILE_SERVICE_PORT, () => {
    console.log(
      `Server is running on port ${process.env.PROFILE_SERVICE_PORT}`,
    );
  });
});
