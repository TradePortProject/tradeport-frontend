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

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role!)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
