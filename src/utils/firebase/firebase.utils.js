import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

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
