import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Adjust the import path as necessary

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isFormSubmitted = useSelector(
    (state: RootState) => state.route.isFormSubmitted
  );

  if (!isFormSubmitted) {
    // Redirect user to the home page or any other page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
