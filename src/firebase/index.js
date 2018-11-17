// React components should be only allowed to access the index.js file
// as the sole interface to the entire Firebase module (src/firebase/),
// and should not access the auth or firebase files directly.
import * as auth from "./auth";
import * as firebase from "./firebase";

export { auth, firebase };
