import actionTypes from "../actions/actionTypes";

export const initialState = {
  id: null,
  userName: null,
  email: null,
  gender: null,
  age: null,
  photoUrl: null,
  skills: [],
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
        id: null,
        userName: null,
        email: null,
        gender: null,
        age: null,
        photoUrl: null,
        skills: [],
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