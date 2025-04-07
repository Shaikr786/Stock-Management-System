import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ role }) => {
  const { user, token, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Prevents redirect before auth check

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
