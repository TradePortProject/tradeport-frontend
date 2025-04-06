import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface RoleBasedRouteProps {
  allowedRoles: ("retailer" | "wholesaler" | "admin")[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  // Check if user is authenticated and has an allowed role
  if (!isAuthenticated || !user || (typeof user.role === 'string' && !allowedRoles.includes(user.role as any))) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
