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
  console.log(collectionRef);
  //because firebase only deal with 1 document per time, we make a group of document using batch
  const batch = writeBatch(firestore);
  //loop over objectsToAdd
  objectsToAdd.forEach((obj) => {
    //what this means is get the document from the collection, then generate ID based on title
    const newDocRef = doc(collectionRef, obj.title);
    //calling batch.set will group all the documents, and what we will pass is the docRef and the its obj
    batch.set(newDocRef, obj);
  });
  //as we call commit, we are passing documents under "collections" into firebase, await meaning it return a promise
  await batch.commit();
};
const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" }); //To popup signin prompt of Google, other options are available in documentation

export const signInWithGoogle = () => signInWithPopup(auth, provider);
