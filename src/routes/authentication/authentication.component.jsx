import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth, //auth is a singleton!
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const Authentication = () => {
  // this is an example of signInWithGoogleRedirect

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>Sign In Page</h1>
      <SignInForm />
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with google redirect
      </button> */}
      <SignUpForm />
    </div>
  );
};

export default Authentication;
