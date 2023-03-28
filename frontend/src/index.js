import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import UserContext from "./LoginContext";

import "./index.scss";

const useStrict = false;

if (useStrict) {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <UserContext
      subPages={
        <BrowserRouter>
          <App />
        </BrowserRouter>
      }
    />,
    document.getElementById("root")
  );
}

serviceWorker.unregister();
