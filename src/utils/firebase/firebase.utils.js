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
const provider = new GoogleAuthProvider(); // GoogleAuthProvider is a class
//set parameters
provider.setCustomParameters({
  prompt: "select_account",
});
//this means that every time someone interacts w/ the provider, it will force them to select an account
//this is just a configuration setup that google wants

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

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
