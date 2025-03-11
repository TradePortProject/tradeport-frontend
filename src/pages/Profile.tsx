import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isSaveDisabled =
    !firstName && !lastName && !displayName && !email && !newPassword;

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900">My Account</h2>

      {/* Container */}
      <div className="mt-6 flex w-full max-w-4xl flex-col rounded-lg bg-white p-6 shadow-lg md:flex-row md:p-8">
        {/* Sidebar (Desktop) */}
        <div className="hidden w-1/4 flex-col border-r border-gray-200 pr-6 md:flex">
          <div className="flex flex-col items-center">
            <img
              src={user?.picture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="h-20 w-20 rounded-full shadow-md"
            />
            <h3 className="mt-2 text-lg font-semibold">{user?.name}</h3>
          </div>
          <nav className="mt-6 space-y-3">
            <button className="w-full text-left text-gray-700 hover:text-blue-500">
              Account
            </button>
            <button className="w-full text-left text-gray-700 hover:text-blue-500">
              Address
            </button>
            <button className="w-full text-left text-gray-700 hover:text-blue-500">
              Orders
            </button>
            <button className="w-full text-left text-gray-700 hover:text-blue-500">
              Wishlist
            </button>
            <button className="w-full text-left text-red-500 hover:text-red-700">
              Log Out
            </button>
          </nav>
        </div>

        {/* Mobile Dropdown */}
        <div className="mb-4 w-full md:hidden">
          <select className="w-full rounded border border-gray-300 p-2">
            <option>Account</option>
            <option>Address</option>
            <option>Orders</option>
            <option>Wishlist</option>
            <option className="text-red-500">Log Out</option>
          </select>
        </div>

        {/* Main Form */}
        <div className="w-full md:w-3/4">
          <h3 className="mb-4 text-xl font-semibold">Account Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm text-gray-700">First Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border-gray-300 p-2"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Last Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border-gray-300 p-2"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-gray-700">Display Name</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border-gray-300 p-2"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border-gray-300 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Change Section */}
          <h3 className="mb-4 mt-6 text-xl font-semibold">Password</h3>
          <div>
            <label className="block text-sm text-gray-700">Old Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border-gray-300 p-2"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm text-gray-700">New Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border-gray-300 p-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border-gray-300 p-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <button
            className={`mt-6 w-full rounded-md px-4 py-2 text-white transition ${
              isSaveDisabled
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isSaveDisabled}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
