import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Requireauth = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const token=user?.token;
//   console.log(user);

  //   if (isLoading) {
  //     return (
  //       <p className="text-center text-danger fs-1 fw-bold loading-issue">
  //         Loading...
  //       </p>
  //     );
  //   }
  if (!token) {
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
  }
  return children;
};

export default Requireauth;