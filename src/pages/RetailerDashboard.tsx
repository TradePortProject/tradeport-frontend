import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RetailerDashboard: React.FC = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "retailer") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-blue-600">
          Retailer Dashboard
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Welcome, {user?.name || "Retailer"} ({user?.email})
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-blue-200 p-6 shadow-md">
            <h3 className="text-lg font-semibold">Orders</h3>
            <p className="text-sm text-gray-700">
              Manage your customer orders efficiently.
            </p>
          </div>
          <div className="rounded-lg bg-blue-200 p-6 shadow-md">
            <h3 className="text-lg font-semibold">Inventory</h3>
            <p className="text-sm text-gray-700">
              Track and update your product stock levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
