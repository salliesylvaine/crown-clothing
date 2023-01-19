import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// the actual component
// essentially allowing any of its child components to access the values inside of its useState
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // we want to be able to call this setter and get the value anywhere in the
  //component tree that is nested w/in the actual provider value
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      //runs the moment you initialize the listener
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
