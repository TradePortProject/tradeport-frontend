import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/features/authSlice";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // ✅ Close icon

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
      <div>
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
      </div>

      {/* ✅ Profile Dropdown (White Background & Close Button in Mobile) */}
      <MenuItems className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5">
        {/* ✅ Close Button for Mobile */}
        <div className="flex items-center justify-between border-b px-4 py-2 sm:hidden">
          <span className="text-sm font-semibold text-gray-700">Profile</span>
          <MenuButton>
            <XMarkIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </MenuButton>
        </div>

        <MenuItem>
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Your Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            type="button"
            onClick={() => dispatch(logout())}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileDropdown;
