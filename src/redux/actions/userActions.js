import FireManager from "../../firebase/FireManager";
import actionTypes from "./actionTypes";


function actionGetUser(userData) {
    return {
        type: actionTypes.GET_USER_FROM_DB,
        payload: userData,
    };
}

export function actionGetUserFromAuth(user) {
    return {
        type: actionTypes.GET_AUTH_USER,
        user
    };
}

export const actionRemoveUser = {
    type: actionTypes.REMOVE_USER_FROM_STORE
};

export function dispatchUserFromDb(userId) {
    return function (dispatch) {
        FireManager.getUser(userId)
            .then(user => {
                dispatch(actionGetUser(user));
            })
            .catch(error => {
                console.error(error);
            })
    }
}




