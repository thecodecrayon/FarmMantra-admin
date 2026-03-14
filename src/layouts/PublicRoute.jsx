import { Navigate } from "react-router-dom";
import useAuth from "../contexts/auth/useAuth";

const PublicRoute = ({ children }) => {
  const { getAuthenticatedStatus } = useAuth();

  const isAuthenticated = getAuthenticatedStatus();

  console.log("Is authenticaled", isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
