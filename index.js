require('dotenv').config({silent: process.env.NODE_ENV === 'production'});
const express = require('express');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const HttpStatus = require('http-status-codes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
//! Logs
const logger = require('./services/logger');

const app = express();
// Helmet setup
app.use(helmet());

// Rate limit setup, this will help in minimizing DOS attacks
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit number of requests per IP
  delayMs: 0, //
});
app.use(limiter);

app.use(cors());
app.use(bodyParser.json());

//! REDIS CACHE
//require('./services/cache');

//! Swagger
const swaggerSpec = swaggerJSDoc(swaggerDoc);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//! Routes
const {meters} = require('./routes');
app.use('/api', meters);

//! Catch Endpoints Errors Here
app.use(function (err, req, res, next) {
  //! Send Bad Request and log it
  res.status(HttpStatus.BAD_REQUEST).send();
  logger.error(err.message);
});

if (process.env.NODE_ENV === 'production') {
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, './client/build')));

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
}

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  logger.info('Remote Metering Solutions API Listening on Port: ' + PORT);
});
