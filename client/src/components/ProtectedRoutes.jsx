import React from "react";
import { Navigate } from "react-router-dom";
import jwt from "jwt-decode";
const ProtectedRoutes = (props) => {
  const token = localStorage.getItem("token");
  const decoedToken = token && jwt(token);

  const validToken =
    decoedToken && decoedToken.exp * 1000 > new Date().getTime();
  if (!validToken) {
    localStorage.removeItem("token");
  }
  if (localStorage.getItem("token") && validToken) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
