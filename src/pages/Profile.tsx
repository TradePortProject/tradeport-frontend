import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center">⚠️ User not logged in. Please log in.</div>
    );
  }

  const handleNavigation = () => {
    if (user.role === "retailer") {
      navigate("/retailer-dashboard");
    } else if (user.role === "wholeseller") {
      navigate("/wholesaler-dashboard");
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <h2 className="text-2xl font-semibold">
        👤 Welcome, {user.name || "User"}!
      </h2>
      <img
        src={user.picture || "https://via.placeholder.com/150"}
        alt="Profile"
        className="mt-4 h-24 w-24 rounded-full"
      />
      <p className="mt-2">📧 Email: {user.email}</p>
      <p className="mt-1">🛒 Role: {user.role?.toUpperCase()}</p>

      <button
        className="mt-4 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
        onClick={handleNavigation}
      >
        Go to {user.role === "retailer" ? "Retailer" : "Wholesaler"} Dashboard
      </button>
    </div>
  );
};

export default Profile;
