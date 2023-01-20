import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  console.log("dispatched");
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state, //spreads in previous values on state object, then changes the one you specify to change
        currentUser: payload,
      };
    case "increment":
      return {
        value: state.value + 1,
      };

    default:
      throw new Error(`unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null, //when we 1st initialize our app, we have no current user
};

// the actual component
// essentially allowing any of its child components to access the values inside of its useState
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  //dispatch is a function that you pass an action object into. if you want the reducer to receive an action,
  //you have to call dispatch

  const { currentUser } = state;
  console.log(currentUser);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  // const [currentUser, setCurrentUser] = useState(null);

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

/*
Reducers are pretty much just functions that return an object

const useReducer = (state, action) => {


  return {
currentUser: null

  }
  ***this object is the state of the reducer
}




*/
