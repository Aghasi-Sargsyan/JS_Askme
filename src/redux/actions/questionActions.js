import actionTypes from "./actionTypes";

export function actionAddQuestion(questionData) {
    return {
        type: actionTypes.ADD_QUESTION,
        questionData
    }
}

// export function getQuestionsFromDb(userId, callback) {
//     return function (dispatch) {
//         FireManager.getQuestions(userId)
//             .then(user => {
//                 dispatch(actionAddQuestion(user));
//             })
//             .then(() => {
//                 if (callback) {
//                     try {
//                         callback();
//                     } catch (e) {
//                         console.error(e);
//                     }
//                 }
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     };
// }
