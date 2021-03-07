const initializeFirebase = require('./initializeFirebase');
const express = require('express');
const cors = require('cors');
const mainRouter = require('./routes');
const morgan = require('morgan');

initializeFirebase();
const app = express();
app.use(morgan('tiny'));
// Setup cors. (dont use origin true in prod)
app.use(cors({ origin: true }));
// Setup main router
app.use('/', mainRouter);
// Setup 404 response
app.use('*', (req, res) => res.status(404).send());

module.exports = app;