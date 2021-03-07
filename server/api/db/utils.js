
/**
 * @name getDataIfExists
 * @async
 * @description If the document exists for the given snapshot return its data, otherwise throw an error
 * @param {Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>} snapshotPromise
 * @throws
 * @returns {Promise<object>} 
 */
const getDataIfExists = async snapshotPromise => {
    const documentSnapshot = await snapshotPromise;
    if (!documentSnapshot.exists) {
        throw new Error('NOT FOUND');
    }
    return {
        id: documentSnapshot.id,
        ...documentSnapshot.data()
    };
}

/**
 * @name checkIfDataExists
 * @async
 * @description Returns if the data exists
 * @param {Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>} snapshotPromise
 * @throws
 * @returns {Promise<boolean>} 
 */
const checkIfDataExists = async snapshotPromise => {
    const documentSnapshot = await snapshotPromise;
    return documentSnapshot.exists;
};

/**
 * @name getCreatedData
 * @description gets the data from a document data creation promise
 * @param {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>} documentDataPromise 
 * @returns {Promise<object>}
 */
const getCreatedData = async documentDataPromise => {
    const documentSnapshot = await documentDataPromise;
    const documentData = await documentSnapshot.get();
    return getDataIfExists(documentData);
}

/**
 * @name getDocs
 * @async
 * @description used to retrieve docs from a query snapshot
 * @param {Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>} snapshotPromise 
 * @returns {Array<object>} Array of docs data
 */
const getDocs = async snapshotPromise => {
    const querySnapshot = await snapshotPromise;
    return Promise.all(querySnapshot.docs.map(snapshot => ({
        id: snapshot.id,
        ...snapshot.data()
    })));
}

module.exports = {
    getDataIfExists,
    getCreatedData,
    checkIfDataExists,
    getDocs
}