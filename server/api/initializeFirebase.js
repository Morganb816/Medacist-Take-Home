var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

const intializeFirebase = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
};

module.exports = intializeFirebase;