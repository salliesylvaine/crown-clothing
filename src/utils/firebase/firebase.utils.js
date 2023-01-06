import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnHJ0CCOnubOUtJpBdPq3Gkb0Kl90fYRc",
  authDomain: "crown-clothing-db4d9.firebaseapp.com",
  projectId: "crown-clothing-db4d9",
  storageBucket: "crown-clothing-db4d9.appspot.com",
  messagingSenderId: "262743426094",
  appId: "1:262743426094:web:cb667a5679fba03d914bbf",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Initialize Provider
const googleProvider = new GoogleAuthProvider(); // GoogleAuthProvider is a class
// there are multiple ways you can provide different providers, googleAuth is just one of them.

//set parameters
googleProvider.setCustomParameters({
  prompt: "select_account",
});
//this means that every time someone interacts w/ the provider, it will force them to select an account
//this is just a configuration setup that google wants

//there's a reason why GoogleAuthProvider is a class and the others are instances.
// the auth is a singleton bc it keeps track of the authentication state of the ENTIRE application.
// as the user signs in through different means / methods, we need a way to be certain of what it is
// that the user has done, esp in the framework of this browser, where whenever you navigate away from your website,
// you're breaking the instance of the website. So the auth is the only way to keep track of whether or not users are properly
// authenticating or not.

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //if user data does not exist
  //create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if user data exists
  return userDocRef;
  //return userDoc
};
