const admin = require('firebase-admin');

/**
 * @name deleteCollection 
 * @async
 * @description Deletes a whole firestore collection
 * @param {string} collectionPath Path to firestore collection
 * @returns {Promise<FirebaseFirestore.WriteResult>}
 */
const deleteCollection = async (collectionPath) => {
    const docs = await admin.firestore().collection(collectionPath).listDocuments();
    await Promise.all(docs.map(doc => doc.delete()))
}

/**
 * @name deleteCollections
 * @async
 * @description Deletes any collection passed in as an argument
 * @param  {...string} collectionsToDelete Path's to firestore collections
 * @returns {Promise<array>} Array of results from deleting
 */
const deleteCollections = (...collectionsToDelete) => Promise.all(collectionsToDelete.map(deleteCollection))

/**
 * @name seedData
 * @description Seeds data to our database
 * @param {string} collectionPath Path to collection where we want to seed this data.
 * @param {employee} employee Data to seed to our database.
 * @param {string} id If provided we will create the data with this id as the doc id.
 * @returns {Promise<FirebaseFirestore.WriteResult>}
 */
const seedData = (collectionPath, data, id) => id
    ? admin.firestore().collection(collectionPath).doc(id).create(data)
    : admin.firestore().collection(collectionPath).doc().create(data);

const getAllDocIdsInCollection = async (collectionPath) => {
    const collectionSnapshot = await admin.firestore().collection(collectionPath).get();
    return collectionSnapshot.docs.map(doc => doc.id)
}

/**
 * @name createSeeder
 * @description creates a function that seeds data for the collection path passed into this function.
 * @param {string} collectionPath Path of the collection we wish to add this seed data to.
 * @param {function<any>} dataCreator Function to create the seed data.
 * @returns {Function<Promise<FirebaseFirestore.WriteResult>>}
 */
const createSeeder = (collectionPath, dataCreator) => id => seedData(collectionPath, dataCreator(), id);

/**
 * @name runMultipleParalellTimes
 * @description Runs a function multiple times in paralell
 * @param {function<any>} func Function to run
 * @param {number} timesToRun Amount of times to run
 * @returns {Promise<array>} Results of executions
 */
const runMultipleParalellTimes = async (func, timesToRun) => Promise.all(
    new Array(timesToRun)
    .fill('')
    .map(func)
);

/**
 * @name initializeApp
 * @description initializes the firestore application
 * @returns {void}
 */
const initializeApp = () => {
    const NO_SERVICE_ACCOUNT_FOUND = `
    NO SERVICE ACCOUNT FILE FOUND
    ===================================================================================    
    Please add a "serviceAccount.json" to this directory to use this script
    `;

    let serviceAccount;
    try {
        serviceAccount = require('./serviceAccount.json');
    } catch (err) {
        console.log(NO_SERVICE_ACCOUNT_FOUND);
        process.exit();
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
}

module.exports = {
    deleteCollection,
    deleteCollections,
    seedData,
    runMultipleParalellTimes,
    initializeApp,
    createSeeder,
    getAllDocIdsInCollection
}