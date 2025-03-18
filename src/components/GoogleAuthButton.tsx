import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { login, setUserDetails } from "../store/features/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const GoogleAuthButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("Google authentication failed: No credential received");
      alert("Google login failed. Please try again.");
      return;
    }

    console.log("Received fresh Google Token:", credentialResponse.credential); // Debugging

    try {
      const { email, name, picture } = jwtDecode<{
        email: string;
        name?: string;
        picture?: string;
      }>(credentialResponse.credential);

      dispatch(setUserDetails({ email, name, picture }));

      // Send only the token as raw text/plain
      const response = await axios.post(
        "http://localhost:7237/api/User/validategoogleuser",
        credentialResponse.credential, // Send as a raw string
        {
          headers: { "Content-Type": "application/json" }, // Ensure raw string format
          validateStatus: (status) => status < 500, // Prevents throwing errors for 4xx responses
        },
      );

      if (response.status === 200) {
        console.log("Backend validation successful:", response.data);
        const userData = response.data;

        // Dispatch to Redux **after backend validation**
        dispatch(
          login({ token: credentialResponse.credential, user: userData }),
        );

        // Redirect to profile page
        navigate("/profile");
      } else if (response.status === 401) {
        alert("Invalid Google authentication token. Please try again.");
      } else if (response.status === 404) {
        alert("User not registered. Please register first.");
        navigate("/register");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Login Process Failed", error);
      alert("Authentication failed. Please try again.");
    }
  };

  return (
    <div>
      <h3>Login with Google</h3>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.error("Google Login Failed");
          alert("Google authentication failed. Please try again.");
        }}
      />
    </div>
  );
};

export default GoogleAuthButton;
