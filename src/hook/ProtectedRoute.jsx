// import { AuthContext } from "@/context/AuthenticationContext";
// import Spinner from "@/utils/Spinner/Spinner";
// import React, { useContext, useState, useEffect } from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   const { isAuthenticated } = useContext(AuthContext);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(false);
//   }, []);

//   if (isLoading) {
//     return (
//       <div>
//         <Spinner />
//       </div>
//     );
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
// };

// export default ProtectedRoute;



// WITH FIREBASE
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthenticationContext";
import Spinner from "@/utils/Spinner/Spinner";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
