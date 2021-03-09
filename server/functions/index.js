const functions = require('firebase-functions');
const api = require('./api/index.js');

exports.api = functions.https.onRequest(api);