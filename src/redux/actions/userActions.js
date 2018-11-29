import FireManager from "../../firebase/FireManager";
import actionTypes from "./actionTypes";

export function actionAddUser(userData) {
  return {
    type: actionTypes.ADD_USER,
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
  type: actionTypes.CLEAR_ALL_USERS
};

export function getAndDispatchDbUser(userId) {
  return function (dispatch) {
    FireManager.getUser(userId)
      .then(user => {
        dispatch(actionAddUser(user));
      })
      .catch(error => {
        console.error(error);
      });
  };
}
