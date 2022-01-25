'use strict';

// const { Server } = require('http');

require('dotenv').config();
const app = require('./lib/server.js');
const { db } = require('./lib/models');

const PORT = process.env.PORT || 3000;

db.sync()
    .then(() => {
        app.start(PORT);
    });