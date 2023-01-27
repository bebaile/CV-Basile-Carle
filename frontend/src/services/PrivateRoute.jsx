import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ infoUser, children }) {
  if (infoUser.type !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default PrivateRoute;
