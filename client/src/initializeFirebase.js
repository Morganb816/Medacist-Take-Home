import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDLFtotj1-e_2mgbMPTmtnbsrSrSHuMLyY",
    authDomain: "star-wars-app-83455.firebaseapp.com",
    projectId: "star-wars-app-83455",
    storageBucket: "star-wars-app-83455.appspot.com",
    messagingSenderId: "784925783836",
    appId: "1:784925783836:web:b180f7ee7a9e7bdee8acd9"
};

const initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
};

export default initializeFirebase;