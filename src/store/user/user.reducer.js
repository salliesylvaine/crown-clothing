import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null, //when we 1st initialize our app, we have no current user
};

export const userReducer = (state = INITIAL_STATE, action) => {
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
      return state;
  }
};

// Key Point: Actions pass to every single reducer, so every single reducer by default
//needs to return the previous state if none of the cases match to the type
