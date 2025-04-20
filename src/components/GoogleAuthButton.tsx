import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { login, setUserDetails } from "../store/features/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ENDPOINTS from "../config/apiConfig";

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

      const response = await axios.post(
        ENDPOINTS.USER.VALIDATE_GOOGLE,
        { token: credentialResponse.credential }, // Send as JSON object
        {
          headers: {
            "Content-Type": "application/json"
          },
          validateStatus: (status: number) => status < 500,
        }
      );

      if (response.status === 200) {
        console.log("Backend validation successful:", response.data);

        // Check if response has nested user object
        const userData = response.data.user
          ? response.data.user
          : response.data;
        const token = response.data.token || credentialResponse.credential;

        console.log("Backend user data:", userData);
        console.log("Type of role:", typeof userData.role);
        console.log("Role value:", userData.role);

        // Create formatted user data from correct location
        const formattedUserData = {
          loginID: userData.email || userData.loginID || "",
          userID: userData.userID || "",
          userName: userData.userName || "",
          role:
            typeof userData.role === "string"
              ? parseInt(userData.role, 10)
              : userData.role,
          phoneNo: userData.phoneNo || "",
          address: userData.address || "",
          remarks: userData.remarks || "",
          isActive: userData.isActive !== undefined ? userData.isActive : true,
        };

        console.log("Formatted user data:", formattedUserData);

        // Dispatch with proper data
        dispatch(
          login({
            token: token,
            user: formattedUserData,
          }),
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