import actionTypes from "../actions/actionTypes";

export const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_QUESTION:
            return state.concat(action.questionArray);
        default:
            return state;
    }
}