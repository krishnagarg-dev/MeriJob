import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function ProtectedRoute({children}){const {user,token}=useAuth();const location=useLocation();if(!token||!user)return <Navigate to="/login" replace state={{from:location.pathname}}/>;if(user.role!=="employer")return <Navigate to="/login" replace/>;return children;}
export default ProtectedRoute;
