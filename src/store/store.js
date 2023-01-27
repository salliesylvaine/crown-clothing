import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { loggerMiddleware } from "./middleware/logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

// Middleware are little library helpers that run before an action hits the reducers

// Currying a function is a function that returns back another function
/*      ex: const curryFuc = (a) => (b,c) ={
                    a + b - c
                                        }


        const withA = curryFuc(3);

        withA(2, 4); // 3 + 2 - 4
*/

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && loggerMiddleware,
  thunk,
].filter(Boolean); //filtering out the boolean so we don't pass false as a middleware
//if evaluated to false, it just returns an empty array

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

//this is specifying using the redux devtools compose for the production window object, otherwise just use the
// compose that comes with redux

//compose is a functional programming concept, it's a way for us to pass multiple functions left to right
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

//middleware has to be passed as the third argument
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
