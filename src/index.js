import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { store } from './data'

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);
