import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/features/authSlice";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/catalogGrid" },
  { name: "Product", href: "/product" },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 w-full bg-white shadow-md"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-black focus:outline-none">
              <Bars3Icon className="block h-6 w-6" />
              <XMarkIcon className="hidden h-6 w-6" />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="text-lg font-bold">
              TradePort
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={classNames(
                      isActive
                        ? "border-b-2 border-black font-bold text-black"
                        : "text-gray-600 hover:text-black",
                      "rounded-md px-3 py-2 text-sm font-medium",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Show Cart & Profile only if user is authenticated */}
              {isAuthenticated && (
                <>
                  <Link
                    to="/cart"
                    className={`text-gray-600 hover:text-black ${
                      location.pathname === "/cart"
                        ? "border-b-2 border-black font-bold text-black"
                        : ""
                    }`}
                  >
                    Cart
                  </Link>
                  <Link
                    to="/profile"
                    className={`text-gray-600 hover:text-black ${
                      location.pathname === "/profile"
                        ? "border-b-2 border-black font-bold text-black"
                        : ""
                    }`}
                  >
                    Profile
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Side (Cart, Profile, Auth) */}
          <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Cart Link (Only Show if Authenticated) */}
            {isAuthenticated && (
              <Link to="/cart" className="relative">
                <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-black" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-xs text-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            )}

            {/* Authenticated User Dropdown */}
            {isAuthenticated ? (
              <Menu as="div" className="relative">
                <div>
                  <MenuButton className="relative flex rounded-full text-sm focus:outline-none">
                    {user?.picture ? (
                      <>
                        {!isImageLoaded && (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-white">
                            {user?.name?.charAt(0) || "U"}
                          </div>
                        )}
                        <img
                          src={user.picture}
                          alt="Profile"
                          className={`h-10 w-10 rounded-full object-cover ${
                            isImageLoaded ? "block" : "hidden"
                          }`}
                          onLoad={() => setIsImageLoaded(true)}
                          onError={(e) => {
                            e.currentTarget.src = "/images/default-profile.png";
                            setIsImageLoaded(true);
                          }}
                        />
                      </>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-white">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={isActive ? "page" : undefined}
                className={classNames(
                  isActive
                    ? "bg-gray-200 text-black"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black",
                  "block rounded-md px-3 py-2 text-base font-medium",
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
