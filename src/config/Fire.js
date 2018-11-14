import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC0JHqM6t3RzAulMGbe71UhOw-f4AnSqh8",
    authDomain: "askme-94f3d.firebaseapp.com",
    databaseURL: "https://askme-94f3d.firebaseio.com",
    projectId: "askme-94f3d",
    storageBucket: "askme-94f3d.appspot.com",
    messagingSenderId: "318512192011"
};

const fire = firebase.initializeApp(config);

export default fire;