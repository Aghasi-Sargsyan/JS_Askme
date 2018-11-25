import {firestore} from "firebase";

export default class FireManager {
    /**
     * Adding dbUser to database,
     * dbUser must be an object with valid id property
     */
    static addUser(user) {
        if (user.id) {
          return firestore().collection("users").doc(user.id).set(user)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch(error => {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.error("need to pass an object with existing id property");
        }
    }

    /**
     * Returns a promise with resolved dbUser object
     * calling example... getUserSkills(userId).then(dbUser => {do your staff with dbUser object});
     * */
    static getUser(userId) {
        if (userId) {
            const ref = firestore().collection("users").doc(userId);

            return ref.get().then(doc => {
                if (doc.exists) {
                    return doc.data();
                } else {
                    console.error("No such dbUser!");
                }
            })
                .catch(function (error) {
                    console.error("Error getting dbUser:", error);
                });
        }
    }

    /**
     * Updating dbUser database properties,
     * pass a valid userId and an object that contains dbUser fields
     * for example {userName: name
     *              age: 18
     *              skills: [{value: driver, rate: 0}]
     *             }
     * */
    static updateUser(data = {}, userId) {
        if (userId) {
            firestore().collection("users").doc(userId).update(
                data.skills
                    ? {
                        ...data,
                        skills: firestore.FieldValue.arrayUnion(...data.skills)
                    }
                    : {...data}
            )
                .then(() => {
                    console.log("dbUser successfully updated");
                })
                .catch(e => {
                    console.error("Error updating dbUser: ", e);
                });
        } else {
            console.error("need to pass an object with existing id property");
        }
    }

    static addQuestion(question, userId) {
        if (userId) {
            const ref = firestore().collection("questions").doc();
            const newQuestion = {...question, id: ref.id};

            ref.set(newQuestion)
                .then(() => {
                    console.log("Question successfully added");
                })
                .catch(error => {
                    console.error("Error when adding question", error);
                });
        } else {
            console.error("need to pass an existing id property");
        }
    }

    static getQuestions(userId) {
        if (userId) {
            return firestore().collection("questions").where("userId", "==", userId).get()
                .then(querySnapshot=>{
                    const questionsArray = [];
                    querySnapshot.forEach((doc) => {
                        questionsArray.push(doc.data());
                    });
                    return questionsArray;
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        }
    }


    /**
     * Adding global skill to database
     * Pass a string or strings, or ...array
     */
    static addGlobalSkill(...skills) {
        skills.forEach(skill => {
            firestore().collection("skills").doc(skill).set({value: skill})
                .then(() => console.log("skill successfully added"))
                .catch(e => console.error("Error writing document: ", e));
        });
    }
}
