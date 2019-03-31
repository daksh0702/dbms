import React from "react";
import ReactDOM from "react-dom";
import "./Resources/css/styles.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById("root")
);
