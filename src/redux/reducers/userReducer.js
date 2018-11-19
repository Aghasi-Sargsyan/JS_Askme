import actionTypes from "../actions/actionTypes";

export const initialState = {
    user: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USER:
            return {
                ...state,
                user: action.userData,
            };
        default:
            return state;
    }
}