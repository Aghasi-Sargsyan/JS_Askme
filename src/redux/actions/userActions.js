import FireManager from "../../firebase/FireManager";
import actionTypes from "./actionTypes";


function actionGetUser(userData) {
    return {
        type: actionTypes.GET_USER,
        userData: userData,
    };
}

export function getUserFromDb(id) {
    return function (dispatch) {
        FireManager.getUser(id)
            .then(user => {
                dispatch(actionGetUser(user));
            })
            .catch(error => {
                console.error(error);
            })
    }
}

