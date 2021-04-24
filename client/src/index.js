import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import App from "./App2";
/* Context per fare lo share dello state tra le pagine */
import { StateProvider } from "./StateProvider";
import { initialState, reducer } from "./stateReducer";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
