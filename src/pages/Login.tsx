import { useState } from "react";
import { useDispatch } from "react-redux";
import { register as registerUser } from "../store/features/authSlice";
import GoogleAuthButton from "../components/GoogleAuthButton";

const Login: React.FC = () => {
  const [role, setRole] = useState<"retailer" | "wholesaler" | null>(null);
  const dispatch = useDispatch();

  const handleRoleSelection = (selectedRole: "retailer" | "wholesaler") => {
    setRole(selectedRole);
    dispatch(registerUser({ email: "", role: selectedRole })); // Store initial role in Redux
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        {/* ✅ Title */}
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Sign in to TradePort
        </h2>

        {/* ✅ Role Selection */}
        <div className="text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-800">
            Choose Your Role
          </h3>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => handleRoleSelection("retailer")}
              className={`w-1/2 rounded-md px-6 py-3 font-medium transition ${
                role === "retailer" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              Retailer
            </button>
            <button
              onClick={() => handleRoleSelection("wholesaler")}
              className={`w-1/2 rounded-md px-6 py-3 font-medium transition ${
                role === "wholesaler"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Wholesaler
            </button>
          </div>
        </div>

        {/* ✅ Google Login Button (Only shows when role is selected) */}
        <div className="mt-6 flex justify-center">
          {role && <GoogleAuthButton role={role} />}
        </div>
      </div>
    </div>
  );
};

export default Login;
