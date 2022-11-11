import React from "react";
import { Navigate } from "react-router-dom";
import jwt from "jwt-decode";
const PublicRoute = (props) => {
  const token = localStorage.getItem("token");

  const decoedToken = token && jwt(token);
  const validToken =
    decoedToken && decoedToken.exp * 1000 > new Date().getTime();
  if (!validToken) {
    localStorage.removeItem("token");
  }
  if (localStorage.getItem("token") && validToken) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
};

export default PublicRoute;
