'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const notFoundHandler = require('./error-handlers/error404');
const errorHandler = require('./error-handlers/error500');

const logger = require('./middleware/logger');
const v1Routes = require('./routers/v1');
const v2Routes = require('./routers/v2');
const authRoutes = require('./routers/auth');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(logger);

app.use(authRoutes);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};