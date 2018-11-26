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

export function getAndDispatchDbUser(userId, callback) {
  return function (dispatch) {
    FireManager.getUser(userId)
      .then(user => {
        dispatch(actionAddDbUser(user));
      })
      .then(() => {
        try {
          callback();
        } catch (e) {
          console.error(e);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
}
