import React from "react";
import ReactDOM from "react-dom";

import { AppProvider } from "./app/app.provider";
import { SessionProvider } from "./session/session.provider";

import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
