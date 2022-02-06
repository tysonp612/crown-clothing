import { ShopActionTypes } from "./shop.types";
import { doc, onSnapshot, collection, getDocs } from "firebase/firestore";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "./../../firebase/firebase.utils";
// export const changeShopParams = (item) => {
//   return {
//     type: ShopActionTypes.CHANGE_PARAMS,
//     payload: item,
//   };
// };

// export const updateCollections = (collectionsMap) => {
//   return {
//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionsMap,
//   };
// };

//MAKING ASYNCHRONOUS REDUX HANDLE
// START doesnt have payload, its purpose is to change the state isFetching to true
export const fetchCollectionsStart = () => {
  return {
    type: ShopActionTypes.FETCH_COLLECTIONS_STARTS,
  };
};

export const fetchCollectionsSuccess = (collectionsMap) => {
  return {
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,
  };
};

export const fecthCollectionsFailure = (errorMessage) => {
  return {
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
  };
};
//The moment this function gets called, redux goes through this function, it will create collectionRef, then dispatch fetch start
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = collection(firestore, "collections");
    //IMPORTANT: WE CALL getDocs to return a promise from collectionRef
    //dispatch run FETCH START (isFetching = true)
    dispatch(fetchCollectionsStart());
    getDocs(collectionRef)
      .then(async (snapshot) => {
        const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
        // updateCollections(collectionsMap);
        //As data returned, dispatch runs FETCH SUCCESS
        dispatch(fetchCollectionsSuccess(collectionsMap));
        //As onSnapShot returns promise, we can run catch for FETCH FAILURE
      })
      .catch((error) => dispatch(fecthCollectionsFailure(error.message)));
  };
};
//THIS IS THE MAIN ACTION, IT WILL CALL A FUNCTION AND BASED ON CERTAIN CONDITION WILL PASS START, SUCCESS OR FAILURE
