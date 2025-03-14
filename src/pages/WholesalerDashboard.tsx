import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WholesalerDashboard: React.FC = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "wholesaler") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-green-600">
          Wholesaler Dashboard
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Welcome, {user?.name || "Wholesaler"} ({user?.email})
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-green-200 p-6 shadow-md">
            <h3 className="text-lg font-semibold">Bulk Orders</h3>
            <p className="text-sm text-gray-700">
              Manage bulk orders from multiple retailers.
            </p>
          </div>
          <div className="rounded-lg bg-green-200 p-6 shadow-md">
            <h3 className="text-lg font-semibold">Logistics</h3>
            <p className="text-sm text-gray-700">
              Track shipments and manage deliveries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholesalerDashboard;
