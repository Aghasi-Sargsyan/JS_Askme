import actionTypes from "../actions/actionTypes";

export const initialState = {
  user: {
      id: null,
      userName: null,
      email: null,
      gender: null,
      age: null,
      photoUrl: null,
      skills: [],
      isNewUser: null,
      isLoggedIn: null
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...state,
        user: {...state.user, ...action.userData}
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: {
            id: null,
            userName: null,
            email: null,
            gender: null,
            age: null,
            photoUrl: null,
            skills: [],
            isNewUser: null,
            isLoggedIn: null
        }
      };
      case actionTypes.LOG_IN:
      return {
        ...state,
          user:{
              ...state.user,
              isLoggedIn: true
          }
      };
    case actionTypes.LOG_OUT:
      return {
          ...state,
          user:{
              ...state.user,
              isLoggedIn: false
          }
      };

    default:
      return state;
  }
}