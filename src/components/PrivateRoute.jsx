import React from "react";
import { useAuth } from "../context/AuthContxt";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? children : <Navigate to={"/"} />;
}

export default PrivateRoute;
