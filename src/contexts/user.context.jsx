import { createContext, useState } from "react";

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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
