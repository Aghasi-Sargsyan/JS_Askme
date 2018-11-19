import actionTypes from "../actions/actionTypes";

export const initialState = {
    user: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USER_FROM_DB:
            return {
                user: action.userData,
            };
        case actionTypes.REMOVE_USER_FROM_STORE:
            return {
                user: {}
            };
        default:
            return state;
    }
}