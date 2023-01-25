import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

//whenever the reducer updates the any of these reducer values, the entire
//store object is going to be a new store object, which triggers selector functions getting rerun

// Whenever any action fires, and as long as a reducer updates, every single component that has a useSelector will rerun.
// This doesn't necessarily mean it will trigger a re-render. (That will depend on how we code out our structure)
