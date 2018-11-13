import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBKfC28pfF_OH8vVM4GZVBXpGhscR4dJho",
    authDomain: "aca-project-eb6f4.firebaseapp.com",
    databaseURL: "https://aca-project-eb6f4.firebaseio.com",
    projectId: "aca-project-eb6f4",
    storageBucket: "aca-project-eb6f4.appspot.com",
    messagingSenderId: "348054195850"
};
const fire = firebase.initializeApp(config);
export default fire;