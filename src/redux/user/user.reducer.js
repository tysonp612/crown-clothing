import { UserActionTypes } from "./user.types";
const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case UserActionTypes.SET_CURRENT_USER:
    //   return {
    //     //userReducer return an object which contains currentUser
    //     ...state,
    //     currentUser: action.payload,
    //   };
    //GOING SAGA
    case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
      return {
        //userReducer return an object which contains currentUser
        ...state,
        currentUser: action.payload,
        //clear error if successful
        error: null,
      };
    case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
    case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
      return {
        //userReducer return an object which contains currentUser
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
