import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, hydrated } = useAuth();
  const location = useLocation();

  // Prevent render flicker on initial load.
  if (!hydrated) return null;

  if (!user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
}
// import React from "react";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const user = localStorage.getItem("user");

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default ProtectedRoute;