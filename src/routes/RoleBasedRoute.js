import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBasedRoute = ({ children, allowableRole }) => {
    const { authData } = useAuth();
  if (!authData) {
    return <Navigate to="/login" />;
  }

  return authData.role === allowableRole ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default RoleBasedRoute;
