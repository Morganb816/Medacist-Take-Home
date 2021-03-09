const initializeFirebase = require('./initializeFirebase');
const express = require('express');
const cors = require('cors');
const mainRouter = require('./routes');
const morgan = require('morgan');

initializeFirebase();
const api = express();

// Setup logging
api.use(morgan('tiny'));
// Setup cors. (dont use origin true in prod)
api.use(cors({ origin: true }));
// Setup main router
api.use('/', mainRouter);
// Setup 404 response
api.use('*', (req, res) => res.status(404).send());

module.exports = api;