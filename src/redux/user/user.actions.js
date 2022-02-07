import { UserActionTypes } from "./user.types";

//take one parameter as the subject that we are selecting
const setCurrentUser = (user) => {
  return { type: UserActionTypes.SET_CURRENT_USER, payload: user };
};
export const googleSignInStart = () => {
  return {
    type: UserActionTypes.GOOGLE_SIGN_IN_START,
  };
};
export const googleSignInSuccess = (user) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
});
export const googleSignInFailure = (error) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
  payload: error,
});

export const emailSignInStart = (emailAndPassword) => {
  return {
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword,
  };
};
export const emailSignInSuccess = (user) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
  payload: user,
});
export const emailSignInFailure = (error) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});
export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});
export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (emailAndPassword) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: emailAndPassword,
});
export const signUpSuccess = (user) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user,
});
export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: error,
});

export default setCurrentUser;
