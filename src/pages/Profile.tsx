import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // Store fetched profile data
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    displayName: user?.name || "",
    email: user?.email || "",
    companyName: "",
    businessType: user?.role || "",
    phoneNumber: "",
    address: "",
  });

  // Fetch Profile Data from Backend
  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `/api/user/profile?email=${user.email}`,
        );
        if (typeof response.data === "object") {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user?.email]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-10">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">My Account</h2>

      {/* Profile Container */}
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">
          Profile Details
        </h3>

        {/* Table Layout */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full border-collapse">
            <tbody>
              {Object.entries(profile).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-200">
                  <td className="w-1/3 bg-gray-50 px-4 py-3 font-medium capitalize text-gray-700">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  <td className="px-4 py-3 text-gray-900">{value || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
