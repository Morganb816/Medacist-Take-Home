var admin = require("firebase-admin");

const intializeFirebase = () => {
  admin.initializeApp();
};

module.exports = intializeFirebase;