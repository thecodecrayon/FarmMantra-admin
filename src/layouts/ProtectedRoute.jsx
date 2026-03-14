import { Navigate } from "react-router-dom";
import useAuth from "../contexts/auth/useAuth";

const ProtectedRoute = ({ children }) => {
  const { getAuthenticatedStatus } = useAuth();

  const isAuthenticated = getAuthenticatedStatus();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
