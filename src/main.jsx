import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Toaster
      style={{
        boxShadow: "0 2px 10px rgba(0,0,0,.1)",
        width: "400px",
      }}
    />
    <App />
    ,
  </React.StrictMode>
);

//
