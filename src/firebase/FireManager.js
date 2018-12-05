import {firestore} from "firebase";

export default class FireManager {
    /**
     * Adding user to database,
     * user must be an object with valid id property
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
     * Returns a promise with resolved user object
     * calling example... getUserSkills(userId).then(user => {do your staff with user object});
     * */
    static getUser(userId) {
        if (userId) {
            const ref = firestore().collection("users").doc(userId);

            return ref.get().then(doc => {
                if (doc.exists) {
                    return doc.data();
                } else {
                    console.error("No such user!");
                }
            })
                .catch(function (error) {
                    console.error("Error getting user:", error);
                });
        }
    }

    /**
     * Updating user database properties,
     * pass a valid userId and an object that contains user fields
     * for example {userName: name
     *              age: 18
     *              skills: [{value: driver, rate: 0}]
     *             }
     * */
    static updateUser(data = {}, userId) {
        if (userId) {
            firestore().collection("users").doc(userId).update(data)
                .then(() => {
                    console.log("user successfully updated");
                })
                .catch(e => {
                    console.error("Error updating user: ", e);
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
                    console.error("Error when adding questions", error);
                });
            return ref.id;
        } else {
            console.error("need to pass an existing id property");
        }
    }

    static addAnswer(answer, userId) {
        if (userId) {
            const ref = firestore().collection("answers").doc();
            const newAnswer = {...answer, id: ref.id};
            ref.set(newAnswer)
                .then(() => {
                    console.log("answer successfully added");
                })
                .catch(error => {
                    console.error("Error when adding answer", error);
                });
            return ref.id;
        } else {
            console.error("need to pass an existing id property");
        }
    }

    /**
     *  Returns a promise with resolved question array
     * */
    static queryData(refConfig) {
        return firestore().collection(refConfig.collectionPath)
            .where(refConfig.fieldPath, refConfig.operator, refConfig.value)
            .get().then(querySnapshot => {
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

    static updateData(data = {}, refConfig) {

        const ref = firestore().collection(refConfig.collectionPath).doc(refConfig.docPath);

        const obj = data.repliedUsers
            ? {repliedUsers: firestore.FieldValue.arrayUnion(data.repliedUsers)}
            : {};

        return ref.update({
            ...data,
            ...obj
        }).then(() => {
            console.log("Document successfully updated!");
        }).catch(error => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
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

    /**
     * returns an array of all Db skills ex. ["HTML", "CSS", "JS"]
     * */
    static getGlobalSkills() {
        return firestore().collection("skills").get().then(querySnapshot => {
                const globalSkills = [];
                querySnapshot.forEach((doc) => {
                    globalSkills.push(doc.id);
                });
                return globalSkills;
            }
        );
    }
}


export const dbPaths = {
    collections: {
        USERS: "users",
        QUESTIONS: "questions",
        SKILLS: "skills",
        ANSWERS: "answers"
    },
    SKILLS: "skills_insensitive",
    AGE: "age",
    GENDER: "gender",
    QUESTION_ID: "questionId",
    USER_ID: "userId",
    ID: "id",
    REPLIED_USERS: "repliedUsers",
};

