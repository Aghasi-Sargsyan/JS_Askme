import FireManager from "../../firebase/FireManager";
import actionTypes from "./actionTypes";

export function actionAddUserData(userData) {
  return {
    type: actionTypes.ADD_USER_DATA,
    userData
  };
}

export const actionLogin = {
  type: actionTypes.LOG_IN
};

export const actionLogout = {
  type: actionTypes.LOG_OUT
};

export const actionRemoveUser = {
  type: actionTypes.REMOVE_USER
};

export function getAndDispatchDbUser(userId) {
  return function (dispatch) {
    FireManager.getUser(userId)
      .then(user => {
        dispatch(actionAddUserData(user));
      })
      .catch(error => {
        console.error(error);
      });
  };
}
