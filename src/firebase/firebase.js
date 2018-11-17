import firebase from "firebase/app";
import "firebase/auth";

// Initialize Firebase
var prodConfig = {
  apiKey: "AIzaSyC0JHqM6t3RzAulMGbe71UhOw-f4AnSqh8",
  authDomain: "askme-94f3d.firebaseapp.com",
  databaseURL: "https://askme-94f3d.firebaseio.com",
  projectId: "askme-94f3d",
  storageBucket: "askme-94f3d.appspot.com",
  messagingSenderId: "318512192011"
};
// for never mixing up your data from development mode with
// your data from your deployed application (production mode).

const devConfig = {
  apiKey: "AIzaSyC0JHqM6t3RzAulMGbe71UhOw-f4AnSqh8",
  authDomain: "askme-94f3d.firebaseapp.com",
  databaseURL: "https://askme-94f3d.firebaseio.com",
  projectId: "askme-94f3d",
  storageBucket: "askme-94f3d.appspot.com",
  messagingSenderId: "318512192011"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
