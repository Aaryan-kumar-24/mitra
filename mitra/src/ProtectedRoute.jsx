// src/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    // Show a minimal loading state while checking stored tokens
    return <div style={{textAlign: 'center', padding: '50px'}}>Checking user session...</div>;
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/Login_signup" replace />;
  }

  return children;
};

export default ProtectedRoute;