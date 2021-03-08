import firebase from 'firebase';

export const getIdToken = () => firebase.auth().currentUser.getIdToken(true);

export const createAuthorizedHeaders = async () => {
    const idToken = await getIdToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
    }
}