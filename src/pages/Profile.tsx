import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // Profile Data from Redux
  const profile = {
    firstName: "", // Not available in Redux (optional)
    lastName: "", // Not available in Redux (optional)
    displayName: user?.name || "N/A",
    email: user?.email || "N/A",
    companyName: "", // Not available in Redux (optional)
    businessType: user?.role ? capitalizeFirstLetter(user.role) : "N/A",
    phoneNumber: user?.phoneNo || "N/A",
    address: user?.address || "N/A",
    remarks: user?.remarks || "N/A",
    isActive: user?.isActive ? "Active" : "Inactive",
  };

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
                  <td className="px-4 py-3 text-gray-900">
                    {value.toString() || "N/A"}
                  </td>
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
