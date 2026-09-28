
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, token } = useAuth();
  const location = useLocation();

  // Redirect unauthenticated users to login
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Only employers can access employer pages
  if (user.role !== "employer") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;