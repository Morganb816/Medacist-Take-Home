import firebase from 'firebase';

/**
 * @name getIdToken
 * @description Returns a valid ID token for the currently logged in user.
 * @returns {string} ID Token for logged in user.
 */
export const getIdToken = () => firebase.auth().currentUser.getIdToken(true);

/**
 * @name createAuthorizedHeaders
 * @description Creates authorized headers for a http request
 * @returns {object} AuthorizedHeaders
 */
export const createAuthorizedHeaders = async () => {
    const idToken = await getIdToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
    }
};

/**
 * @name getBaseURL
 * @description Returns the correct base URL depending on the environment we are in.
 * @returns {string} Correct base url for the environment we are in.
 */
export const getBaseURL = () => process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/star-wars-app-83455/us-central1/api/'
    : 'https://us-central1-star-wars-app-83455.cloudfunctions.net/api/';