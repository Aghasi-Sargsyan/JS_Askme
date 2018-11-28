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

export function getAndDispatchDbUser(userId, callback) {
  return function (dispatch) {
    FireManager.getUser(userId)
      .then(user => {
        dispatch(actionAddUser(user));
      })
      .then(() => {
        if (callback){
          try {
            callback();
          } catch (e) {
            console.error(e);
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
}
