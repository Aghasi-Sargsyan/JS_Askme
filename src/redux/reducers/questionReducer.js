import actionTypes from "../actions/actionTypes";

export const initialState = {
    questions: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_QUESTION:
            return {
                ...state,
                questions: [...state.questions, ...action.questionArray]
            };
        default:
            return state;
    }
}