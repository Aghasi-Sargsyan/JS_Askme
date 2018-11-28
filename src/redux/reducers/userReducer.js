import actionTypes from "../actions/actionTypes";

export const initialState = {
  user: null,
  isLoggedIn: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_USER:
      console.log("user: " + action.userData);
      return {
        ...state,
        user: {...state.user, ...action.userData}
      };
    case actionTypes.CLEAR_ALL_USERS:
      return {
        ...state,
        user: null
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