import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./app/router/router";
import App from "./App";
import { ThemeProvider } from "@emotion/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </App>
  </React.StrictMode>,
);
