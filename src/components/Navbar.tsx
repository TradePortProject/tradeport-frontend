import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // For React Router
import {
  UserCircleIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/catalogGrid" },
    { name: "Product", path: "/product" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b-2 bg-white p-4 shadow-lg">
      {/* Logo */}
      <Link to="/">
        <h1 className="text-xl font-bold">TradePort</h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden space-x-6 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-gray-600 hover:text-black ${
              location.pathname === link.path
                ? "border-b-2 border-black font-bold text-black"
                : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Icons with Navigation */}
      <div className="flex items-center space-x-4">
        {/* Profile Link */}
        <Link to="/profile">
          <UserCircleIcon
            className={`h-6 w-6 cursor-pointer ${
              location.pathname === "/profile" ? "text-black" : "text-gray-600"
            }`}
          />
        </Link>

        {/* Shopping Cart Link */}
        <Link to="/cart" className="relative">
          <ShoppingCartIcon
            className={`h-6 w-6 ${
              location.pathname === "/cart" ? "text-black" : "text-gray-600"
            }`}
          />
          <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-xs text-white">
            2
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-0 top-16 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-600 hover:text-black ${
                  location.pathname === link.path
                    ? "border-b-2 border-black font-bold text-black"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Profile & Cart in Mobile Menu */}
            <Link
              to="/profile"
              className={`flex items-center space-x-2 text-gray-600 hover:text-black ${
                location.pathname === "/profile" ? "font-bold text-black" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <UserCircleIcon className="h-5 w-5" />
              <span>Profile</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center space-x-2 text-gray-600 hover:text-black ${
                location.pathname === "/cart" ? "font-bold text-black" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
