import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  //batch is what we get from writeBatch
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) {
    return;
  }

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if user data exists
  return userDocRef;

  //return userDoc
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; //this offers protection of our code, if we dont receive the arguments, dont run the function

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; //this offers protection of our code, if we dont receive the arguments, dont run the function

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
//fires whenever an auth state changes
