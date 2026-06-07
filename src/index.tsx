import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./app/router/router";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import { DefaultTheme } from "./app/theme/DefaultTheme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={DefaultTheme}>
      <App>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </App>
    </ThemeProvider>
  </React.StrictMode>,
);
