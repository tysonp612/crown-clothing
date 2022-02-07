import { takeLatest, call, put, all } from "redux-saga/effects";
import { ShopActionTypes } from "./shop.types";
import { collection, getDocs } from "firebase/firestore";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "./../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fecthCollectionsFailure,
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  yield console.log("I am fired");
  try {
    const collectionRef = collection(firestore, "collections");
    const snapshot = yield getDocs(collectionRef);
    //call === invoke method
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    //put === dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fecthCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  //it is going to pause when a specific action comes into
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_STARTS,
    fetchCollectionsAsync
  );
}

export function* shopSaga() {
  yield all([call(fetchCollectionsStart)]);
}
