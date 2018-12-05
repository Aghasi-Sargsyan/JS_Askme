import actionTypes from "../actions/actionTypes";

export const initialState = {
    id: "",
    userName: "",
    email: "",
    gender: "",
    age: 0,
    photoUrl: "",
    skills: [],
    skills_insensitive: [],
    isNewUser: null,
    isLoggedIn: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_USER_DATA:
            return {
                ...state,
                ...action.userData,
            };

        case actionTypes.REMOVE_USER:
            return {
                id: "",
                userName: "",
                email: "",
                gender: "",
                age: 0,
                photoUrl: "",
                skills: [],
                skills_insensitive: [],
                isNewUser: null,
                isLoggedIn: null
            };

        case actionTypes.LOG_IN:
            return {
                ...state,
                isLoggedIn: true
            };

        case actionTypes.LOG_OUT:
            return {
                ...state,
                isLoggedIn: false
            };

        default:
            return state;
    }
}