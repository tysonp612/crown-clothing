import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

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

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" }); //To popup signin prompt of Google, other options are available in documentation

export const signInWithGoogle = () => signInWithPopup(auth, provider);
