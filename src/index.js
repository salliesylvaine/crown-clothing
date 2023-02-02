import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// BrowserRouter is used for doing client side routing with URL segments.
// You can load a top level component for each route. This helps separate
// concerns in your app and makes the logic/data flow more clear. (makes it feel
// like a more traditional webpage/web app. also makes it easier to share links to
// specific pages in your app.)

// PersistGate delays the rendering of your app's UI until your persisted state
// has been retrieved and saved to redux. With the Redux Persist library, developers
// can save the Redux store in persistent storage, for example, the local storage.
// Therefore, even after refreshing the browser, the site state will still be preserved.
// loading and persistor are normal setup

// The Provider makes the redux store available to any nested components that need access to it.
