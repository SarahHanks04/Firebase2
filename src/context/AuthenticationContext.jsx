// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userName, setUserName] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const user = token ? JSON.parse(token) : null;

//     if (user) {
//       setIsAuthenticated(true);
//       setUserName(user.name);
//     }
//   }, []);

//   const values = {
//     isAuthenticated,
//     setIsAuthenticated,
//     userName,
//   };

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
// };



// WITH FIREBASE
// import React, { createContext, useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/config/firebase";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsAuthenticated(true);
//         setUser(user);
//       } else {
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const values = {
//     isAuthenticated,
//     user,
//   };

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
// };


import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsubscribe(); 
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const values = {
    isAuthenticated,
    user,
    logout, 
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};