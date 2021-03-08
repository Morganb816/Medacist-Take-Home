const functions = require('firebase-functions');
const api = require('./build/build.js');

exports.api = functions.https.onRequest(api);