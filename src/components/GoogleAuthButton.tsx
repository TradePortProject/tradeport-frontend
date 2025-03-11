import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { login } from "../store/features/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import mockAPI from "../api/api";

const GoogleAuthButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("Google authentication failed: No credential received");
      return;
    }

    try {
      const {
        email,
        name = "Google User",
        picture,
      } = jwtDecode<{
        email: string;
        name?: string;
        picture?: string;
      }>(credentialResponse.credential);

      console.log("Google Login email", email);
      console.log("Google Login name", name);
      console.log("Google Login picture", picture);

      // Use mock API to check if user exists

      // 🐛 Send the JWT to the backend
      const response = await mockAPI.get("/auth/check-user", {
        params: { email },
      });

      // If user is registered, log them in
      const userData = response.data;
      dispatch(login({ token: credentialResponse.credential, user: userData }));

      // Redirect to the profile page
      navigate("/profile");
    } catch (error) {
      // If user is not registered, redirect to the registration page
      if (axios.isAxiosError(error) && error.response?.status == 404) {
        alert("User not registered. Please register first.");
        navigate("/register");
      } else {
        // Log any other errors
        console.error("Login Process Failed", error);
      }
    }
  };

  return (
    <div>
      <h3>Login with Google</h3>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.error("Google Login Failed")}
      />
    </div>
  );
};

export default GoogleAuthButton;
