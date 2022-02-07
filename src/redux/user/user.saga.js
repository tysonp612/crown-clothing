import { takeLatest, put, all, call } from "redux-saga/effects";
import { UserActionTypes } from "./user.types";
import {
  googleSignInSuccess,
  googleSignInFailure,
  emailSignInSuccess,
  emailSignInFailure,
} from "./user.actions";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc } from "firebase/firestore";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "./../../firebase/firebase.utils";
export function* signInWithGoogle() {
  try {
    // import signInWithPopup from firebase auth, import provider from firebase.util, calling this will return an object of user sign in with popup
    const { user } = yield signInWithPopup(auth, googleProvider);
    //import create profile from firebase .util, call this to create profile if user is not recognized
    const userRef = yield call(createUserProfileDocument, user);
    //make a snapshot of user object
    const userSnapshot = yield getDoc(userRef);
    //after we get the snapshot with id, we will put in sucess action, this will update the redux state with payload
    yield put(googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot }));
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}
export function* onGoogleSignInStart() {
  //As Sign In component get dispatch from redux, it will call the action start in user.action, then that action will trigger this saga
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
//It takes email and password to sign in, so we can destructure it like this with payload
// the emailsigninstart is expecting a payload object, which can be anything you want.
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    //import create profile from firebase .util, call this to create profile if user is not recognized
    const userRef = yield call(createUserProfileDocument, user);
    //make a snapshot of user object
    const userSnapshot = yield getDoc(userRef);
    yield put(emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot }));
  } catch (error) {
    yield put(emailSignInFailure(error));
  }
}
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    console.log(userAuth);
    if (!userAuth) return;
    const userRef = yield call(createUserProfileDocument, userAuth);
    //make a snapshot of user object
    const userSnapshot = yield getDoc(userRef);
    yield put(googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot }));
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
  ]);
}
