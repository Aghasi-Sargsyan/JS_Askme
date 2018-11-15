import {auth, firestore} from "firebase";
export default class FireManager {

    static getCurrentUser() {
        return auth().currentUser;
    }

    static addUser(user) {
        firestore().collection("users").doc().set({id: user.uid
                                    
        });
    }
}