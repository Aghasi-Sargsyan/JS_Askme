import actionTypes from "../actions/actionTypes";

export const initialState = {
    question: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_QUESTIONS:
            return {
                ...state,
                question: action.questionData,
            };
        default:
            return state;
    }
}