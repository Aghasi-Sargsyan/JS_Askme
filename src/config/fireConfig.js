import firebase from 'firebase/app';
import 'firebase/firestore'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyC0JHqM6t3RzAulMGbe71UhOw-f4AnSqh8",
    authDomain: "askme-94f3d.firebaseapp.com",
    databaseURL: "https://askme-94f3d.firebaseio.com",
    projectId: "askme-94f3d",
    storageBucket: "askme-94f3d.appspot.com",
    messagingSenderId: "318512192011"
};


export default function initFirebase() {
    firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
    firebase.firestore().settings({timestampsInSnapshots: true});
}
