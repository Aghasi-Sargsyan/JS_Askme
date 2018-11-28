import FireManager from "../../firebase/FireManager";
import actionTypes from "./actionTypes";

function actionAddQuestion(questionData) {
    return {
        type: actionTypes.ADD_QUESTIONS,
        questionData
    }
}

export function getQuestionsFromDb(userId, callback) {
    return function (dispatch) {
        FireManager.getQuestions(userId)
            .then(user => {
                console.log(user);
                dispatch(actionAddQuestion(user));
            })
            // .then(() => {
            //     try {
            //         callback();
            //     } catch (e) {
            //         console.error(e);
            //     }
            // })
            .catch(error => {
                console.error(error);
            });
    };
}
