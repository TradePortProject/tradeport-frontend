import { useRef } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import navLinks from "../../config/navLinks";

const MobileMenu: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <Disclosure as="nav">
      {({ open, close }) => (
        <div ref={menuRef}>
          {/* ✅ Mobile Menu Button */}
          <div className="sm:hidden">
            <DisclosureButton className="relative p-2 text-gray-400 hover:text-black focus:outline-none">
              {open ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </DisclosureButton>
          </div>

          {/* ✅ Mobile Menu Panel (Closes when selecting a menu item) */}
          <DisclosurePanel className="absolute left-0 top-16 w-full bg-white shadow-lg transition-transform duration-200 ease-in-out sm:hidden">
            <div className="flex flex-col space-y-2 p-4">
              {navLinks
                .filter((item) => !item.protected || isAuthenticated) // ✅ Hide protected routes if not logged in
                .map(({ name, path }) => {
                  const isActive = location.pathname === path;
                  return (
                    <Link
                      key={name}
                      to={path}
                      className={`block rounded-md px-3 py-2 text-base font-medium ${
                        isActive
                          ? "bg-gray-200 text-black"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`}
                      onClick={() => close()} // ✅ Closes the menu
                    >
                      {name}
                    </Link>
                  );
                })}

              {/* ✅ Show login button only if user is not authenticated */}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-black"
                  onClick={() => close()} // ✅ Closes the menu
                >
                  Login
                </Link>
              )}
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
};

export default MobileMenu;
