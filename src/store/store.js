import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

// Middleware are little library helpers that run before an action hits the reducers

// Currying a function is a function that returns back another function
/*      ex: const curryFuc = (a) => (b,c) ={
                    a + b - c
                                        }


        const withA = curryFuc(3);

        withA(2, 4); // 3 + 2 - 4
*/

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

//compose is a functional programming concept, it's a way for us to pass multiple functions left to right
const composedEnhancers = compose(applyMiddleware(...middleWares));

//middleware has to be passed as the third argument
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
