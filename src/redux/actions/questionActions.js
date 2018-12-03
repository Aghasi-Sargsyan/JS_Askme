import actionTypes from "./actionTypes";
import FireManager, {questionsFieldPaths} from "../../firebase/FireManager";

export function actionAddQuestion(questionArray) {
  return {
    type: actionTypes.ADD_QUESTION,
    questionArray
  }
}

export function getAndDispatchUserQuestions(userId) {
  return function (dispatch) {
    FireManager.getQuestions({
      fieldPath: questionsFieldPaths.USER_ID,
      operator: "==",
      value: userId
    })
      .then(questionArray => {
        dispatch(actionAddQuestion(questionArray));
      })
      .catch(error => {
        console.error(error);
      });
  };
}
