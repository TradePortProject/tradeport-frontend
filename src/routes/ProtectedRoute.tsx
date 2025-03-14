import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProtectedRoute: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const location = useLocation(); // Get current location

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />; // 🔹 Store previous location
  }

  return <Outlet />;
};

export default ProtectedRoute;
