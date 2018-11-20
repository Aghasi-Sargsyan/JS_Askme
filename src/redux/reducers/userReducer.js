import actionTypes from "../actions/actionTypes";

export const initialState = {
    dbUser: null,
    authUser: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USER_FROM_DB:
            return {
                ...state,
                dbUser: action.payload,
            };
        case actionTypes.REMOVE_USER_FROM_STORE:
            return {
                authUser: null,
                dbUser: null
            };
        case actionTypes.GET_AUTH_USER:
            return {
                ...state,
                authUser: action.user
            };

        default:
            return state;
    }
}