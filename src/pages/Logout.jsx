import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

const Logout = () => {
  const { setIsLoggedIn, notify } = useAuth();

  useEffect(() => {
    handleLogout();
  }, []);

  notify("User successfully logged out.");
  const handleLogout = () => {
    console.log("User successfully logged out.");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return <Navigate to="/login" />;
};

export default Logout;
