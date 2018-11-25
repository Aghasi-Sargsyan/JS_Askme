import actionTypes from "../actions/actionTypes";

export const initialState = {
    dbUser: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_DB_USER:
            return {
                ...state,
                dbUser: action.userData,
            };
        case actionTypes.CLEAR_ALL_USERS:
            return {
                dbUser: null
            };

        default:
            return state;
    }
}