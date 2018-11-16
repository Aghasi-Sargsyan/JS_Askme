import {auth, firestore} from "firebase";

export default class FireManager {

    static getCurrentUser() {
        return auth().currentUser;
    }

    /**
     * Adding or updating user to database, user must be an object
     * Pass userId if you want to update user
     */
    static addUser(user = {}, userId = "") {
        const id = userId || user.id;
        firestore().collection("users").doc(id).set(user, {merge: true})
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch(error => {
                console.error("Error writing document: ", error);
            });
    }

    /**
     * Adding global skill or skills to database
     * Pass a string or array of strings
     */
    static addSkill(skills = "") {
        if (skills instanceof Array) {
            skills.forEach(skill => {
                firestore().collection("skills").doc(skill).set({value: skill})
                    .then(() =>
                        console.log("skill successfully added"
                        ))
                    .catch(e =>
                        console.log("Error writing document: ", e
                        ));
            });
        } else {
            firestore().collection("skills").doc(skills).set({value: skills})
                .then(() =>
                    console.log("skill successfully added"
                    ))
                .catch(e =>
                    console.log("Error writing document: ", e
                    ));
        }
    }


    /**
     * Returns a promise with resolved skills array
     * calling example... getUserSkills(id).then(skills => {do your staff with skills array});
     * */
    static getUserSkills(userId) {
        if (userId) {
            const ref = firestore().collection("users").doc(userId);

            return ref.get().then(doc => {
                if (doc.exists) {
                    return doc.data().skills;
                } else {
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        }
    }
}