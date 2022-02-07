import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const useAuth = () => {
  const userLog = { loggedIn: true };
  return userLog && userLog.loggedIn;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
