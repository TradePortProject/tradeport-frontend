import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("Google authentication failed: No credential received");
      return;
    }

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
          user: { email, name, picture, role: null },
        }),
      );

      // Redirect to profile
      navigate("/profile");
    } catch (error) {
      console.error("Failed to decode Google token:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">Sign in to TradePort</h2>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.error("Google Login Failed")}
        />
      </div>
    </div>
  );
};

export default Login;
