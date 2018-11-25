import FireManager from "../../firebase/FireManager";
import actionTypes from "./actionTypes";

function actionAddDbUser(userData) {
  return {
    type: actionTypes.ADD_DB_USER,
    userData
  };
}

export const actionRemoveUser = {
  type: actionTypes.CLEAR_ALL_USERS
};

export function getAndDispatchDbUser(userId) {
  return function(dispatch) {
    FireManager.getUser(userId)
      .then(user => {
        dispatch(actionAddDbUser(user));
      })
      .catch(error => {
        console.error(error);
      });
  };
}
