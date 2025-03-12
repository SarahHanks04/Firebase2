import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = token ? JSON.parse(token) : null;

    if (user) {
      setIsAuthenticated(true);
      setUserName(user.name);
    }
  }, []);

  const values = {
    isAuthenticated,
    setIsAuthenticated,
    userName,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
