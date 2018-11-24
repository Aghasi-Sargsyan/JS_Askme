import firebase from 'firebase';
import 'firebase/firestore'


const config = {
    apiKey: "AIzaSyC0JHqM6t3RzAulMGbe71UhOw-f4AnSqh8",
    authDomain: "askme-94f3d.firebaseapp.com",
    databaseURL: "https://askme-94f3d.firebaseio.com",
    projectId: "askme-94f3d",
    storageBucket: "askme-94f3d.appspot.com",
    messagingSenderId: "318512192011"
};


export default function initFirebase() {
    // Initialize Firebase
    firebase.initializeApp(config);

    // Initialize Cloud Firestore through Firebase
    firebase.firestore().settings({ timestampsInSnapshots: true });
}
