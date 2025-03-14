import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/features/authSlice";
import { useEffect, useState, Fragment } from "react";

const ProfileDropdown: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (user?.picture) {
      const img = new Image();
      img.src = user.picture;
      img.onload = () => {
        setTimeout(() => setShowImage(true), 150);
      };
    } else {
      setShowImage(false);
    }
  }, [user?.picture]);

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
      >
        Login
      </Link>
    );
  }

  return (
    <Menu as="div" className="relative">
      {/* ✅ Profile Button - Clicking this opens the dropdown */}
      <MenuButton className="relative flex rounded-full text-sm focus:outline-none">
        {showImage && user?.picture ? (
          <img
            src={user.picture}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover transition-opacity duration-200"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-white">
            {user?.name?.charAt(0) || "U"}
          </div>
        )}
      </MenuButton>

      {/* ✅ Dropdown Menu - Clicks outside will close it */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5">
          {/* ✅ Profile Link */}
          <MenuItem>
            {({ active }) => (
              <Link
                to="/profile"
                className={`block px-4 py-2 text-sm ${
                  active ? "bg-gray-100" : "text-gray-700"
                }`}
              >
                Your Profile
              </Link>
            )}
          </MenuItem>

          {/* ✅ Sign Out Button */}
          <MenuItem>
            {({ active }) => (
              <button
                type="button"
                onClick={() => dispatch(logout())}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  active ? "bg-gray-100" : "text-gray-700"
                }`}
              >
                Sign out
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
