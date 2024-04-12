import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material"; // apply basic css

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> // only 2 allowed
  //   <CssBaseline />
  //   <App />
  // </React.StrictMode>
  <>
    <CssBaseline />
    <App />
  </>
);
