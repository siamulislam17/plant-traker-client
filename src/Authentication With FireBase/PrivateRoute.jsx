import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../Authentication With FireBase/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-bars h-screen mx-auto loading-xl"></span>
  }

  if (!user) {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }      

  return children;
};

export default PrivateRoute;
