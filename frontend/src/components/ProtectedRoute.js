import React from "react";
import { Navigate, Redirect, Route } from "react-router-dom";

function ProtectedRoute({ element: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  return <Route {...restOfProps} render={(props) => (isAuthenticated ? <Component {...props} /> : <Navigate to="/" />)} />;
}

export default ProtectedRoute;
