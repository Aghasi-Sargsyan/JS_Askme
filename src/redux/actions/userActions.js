import FireManager from "../../firebase/FireManager";
import actionTypes from "./actionTypes";


function actionGetUser(userData) {
    return {
        type: actionTypes.GET_USER_FROM_DB,
        userData: userData,
    };
}

export function getUserFromDb(userId) {
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

export const actionRemoveUser = {
    type: actionTypes.REMOVE_USER_FROM_STORE
};

