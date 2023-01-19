import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import { AuthenticationContainer } from "./authentication.styles";

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
    <AuthenticationContainer>
      <SignInForm />
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with google redirect
      </button> */}
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
