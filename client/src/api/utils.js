import firebase from 'firebase';

export const getIdToken = () => firebase.auth().currentUser.getIdToken(true);

export const createAuthorizedHeaders = async () => {
    const idToken = await getIdToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
    }
}

export const getBaseURL = () => process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/star-wars-app-83455/us-central1/api/'
    : 'https://us-central1-star-wars-app-83455.cloudfunctions.net/api/';