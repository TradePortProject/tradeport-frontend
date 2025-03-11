import { useState } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState<"retailer" | "wholesaler" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential || !role) {
      console.error(
        "Google authentication failed: No credential or role selected",
      );
      return;
    }

    setIsLoading(true);

    try {
      // Decode Google Token (JWT)
      const { email, name, picture } = jwtDecode<{
        email: string;
        name?: string;
        picture?: string;
      }>(credentialResponse.credential);

      // Dispatch to Redux
      dispatch(
        login({
          token: credentialResponse.credential,
          user: { email, name, picture, role },
        }),
      );

      // Redirect based on role
      navigate(
        role === "retailer" ? "/retailer-dashboard" : "/wholesaler-dashboard",
      );
    } catch (error) {
      console.error("Failed to decode Google token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        {/* ✅ Logo */}
        <div className="flex justify-center">
          <img src="/images/logo.svg" alt="Logo" className="h-10 w-10" />
        </div>

        {/* ✅ Title */}
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Sign in to TradePort
        </h2>

        {/* ✅ Role Selection */}
        <div className="text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-800">
            Choose Your Role
          </h3>
          <p className="text-sm text-gray-500">
            You can only register as a Retailer or Wholesaler.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            {/* Retailer Button (🟦 Blue Theme) */}
            <button
              onClick={() => setRole("retailer")}
              className={`w-1/2 rounded-md px-6 py-3 font-medium transition ${
                role === "retailer"
                  ? "scale-105 bg-blue-600 text-white shadow-md"
                  : "border border-gray-300 bg-gray-100 text-gray-600 hover:bg-blue-100"
              }`}
            >
              Retailer
            </button>

            {/* Wholesaler Button (🟩 Green Theme) */}
            <button
              onClick={() => setRole("wholesaler")}
              className={`w-1/2 rounded-md px-6 py-3 font-medium transition ${
                role === "wholesaler"
                  ? "scale-105 bg-green-600 text-white shadow-md"
                  : "border border-gray-300 bg-gray-100 text-gray-600 hover:bg-green-100"
              }`}
            >
              Wholesaler
            </button>
          </div>
        </div>

        {/* ✅ Google Login Button (Disabled Until Role is Selected) */}
        <div className="mt-6 flex justify-center">
          {role && !isLoading && (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.error("Google Login Failed")}
            />
          )}
        </div>

        {/* ✅ Loading State */}
        {isLoading && (
          <p className="mt-3 text-center text-sm text-gray-600">
            Logging in...
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
