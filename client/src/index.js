import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/antd.min.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import store from "./Redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Toaster />
    <App />
  </Provider>
);
