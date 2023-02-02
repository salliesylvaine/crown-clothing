import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch(); // used to dispatch actions and trigger state changes to the store.

  useEffect(() => {
    //useEffect allows you to perform side effects in components, accepts 2 params, a function and optional array (which should always be included lest we want it to run on every render)
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
      //runs the moment you initialize the listener
    });

    return unsubscribe;
  }, [dispatch]); // dispatch is added here bc the linter was angry
  //empty array only runs on initial render, anything in array runs on initial render plus anytime a dependency value changes

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
