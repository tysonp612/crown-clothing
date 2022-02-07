import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB71nB1ahbQSm4uSEvs59Ff_fbj59m0v1I",
  authDomain: "crown-clothing-a1add.firebaseapp.com",
  projectId: "crown-clothing-a1add",
  storageBucket: "crown-clothing-a1add.appspot.com",
  messagingSenderId: "975231903171",
  appId: "1:975231903171:web:1506bdaa8d42949f14c976",
  measurementId: "G-MWKNGP7YP0",
};

initializeApp(firebaseConfig);
//using async because we are making an API request

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    //by calling onAuthStateChanged, we are subcribing to the user that signed in
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      // By wrapping it in a promise, we return userAuth from getCurrentUser. not callback function from onAuthStateChanged as the resolved value of that promise when the asynchronous response is complete :)
      resolve(userAuth);
    }, reject);
  });
};

export const auth = getAuth();
export const firestore = getFirestore();
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // pass user auth object as parameter from App.js
  //1. Make sure there is an user sign in
  if (!userAuth) return;
  //1.2 create a reference to database location with user uid, the data is not stored yet, but it creates a reference
  // no await userRef because creating userRef doesnt send any any request to backend, it simply creates a reference object, not retrieving information
  const userRef = doc(firestore, `user/${userAuth.uid}`);
  //2. IF there is an user signing in, check if user has already saved in database using snapshot
  //Snapshot only shows data in actual database, use snapshot to check if user has already been stored
  const snapShot = await getDoc(userRef);
  if (!snapShot.exists()) {
    //if no snapshot exists, then create user in DB
    //if no user found, store in database using document object not snapshot (userRef)
    const { displayName, email } = userAuth;
    const createdAt = Date.now();
    //because we are talking to database to store data, we need to use async, await
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  //If user or snapshot has already existed, return User reference for future use
  return userRef;
};
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  //in Database firestore, create a collection based on the key given
  const collectionRef = collection(firestore, collectionKey);
  //because firebase only deal with 1 document per time, we make a group of document using batch
  const batch = writeBatch(firestore);
  //loop over objectsToAdd
  objectsToAdd.forEach((obj) => {
    //what this means is get the document from the collection, then generate ID based on title
    const newDocRef = doc(collectionRef);
    //calling batch.set will group all the documents, and what we will pass is the docRef and the its obj
    batch.set(newDocRef, obj);
  });
  //as we call commit, we are passing documents under "collections" into firebase, await meaning it return a promise
  await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  //extracting querySnapshot array by collections.docs(docs is one of the child elem form collections aka snapshot object)
  //, then for each of elem in snapshot array, we extract title and item from doc.data()
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    //return a new array with objects containing data as below formats
    return {
      //encodeURI will transform string into a version that URL can read
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      items,
      title,
    };
  });

  //[{…}, {…}, {…}, {…}, {…}]
  // 0:{routeName: 'hats', id: 'Hats', items: Array(9), title: 'Hats'}
  // 1: {routeName: 'jackets', id: 'Jackets', items: Array(5), title: 'Jackets'}
  // 2: {routeName: 'mens', id: 'Mens', items: Array(6), title: 'Mens'}
  // 3: {routeName: 'sneakers', id: 'Sneakers', items: Array(8), title: 'Sneakers'}
  // 4: {routeName: 'womens', id: 'Womens', items: Array(7), title: 'Womens'}

  //1 pass in initial object {}
  //2 object goes to the first collection elem, then set the first value to title in lowercase. ex: hats
  //3 return {hats: hats collection} then the initial object goes to the next elem in collection array
  //4 return { hats: hats collection,jackets: jackets collection}
  //accumulator is an empty object
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" }); //To popup signin prompt of Google, other options are available in documentation

// export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
