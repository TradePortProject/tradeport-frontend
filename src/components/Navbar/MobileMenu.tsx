import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/catalogGrid" },
];

const MobileMenu: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="sm:hidden">
            <DisclosureButton className="relative p-2 text-gray-400 hover:text-black focus:outline-none">
              {open ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </DisclosureButton>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    location.pathname === item.href
                      ? "bg-gray-200 text-black"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Show protected links only if logged in */}
              {isAuthenticated && (
                <>
                  <Link
                    to="/product"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-black"
                  >
                    Product
                  </Link>
                  <Link
                    to="/cart"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-black"
                  >
                    Cart
                  </Link>
                  <Link
                    to="/profile"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-black"
                  >
                    Profile
                  </Link>
                </>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default MobileMenu;
