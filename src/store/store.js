import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// Middleware are little library helpers that run before an action hits the reducers
const middleWares = [logger];

//compose is a funcitonal programming concept, it's a way for us to pass multiple functions left to right
const composedEnhancers = compose(applyMiddleware(...middleWares));

//middleware has to be passed as the third argument
export const store = createStore(rootReducer, undefined, composedEnhancers);
