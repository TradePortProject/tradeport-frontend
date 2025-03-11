import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/catalogGrid" },
];

const NavLinks: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <div className="hidden space-x-4 sm:flex">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`text-gray-600 hover:text-black ${
            location.pathname === item.href
              ? "border-b-2 border-black font-bold text-black"
              : ""
          }`}
        >
          {item.name}
        </Link>
      ))}

      {/* Show protected links only when logged in */}
      {isAuthenticated && (
        <>
          <Link
            to="/product"
            className={`text-gray-600 hover:text-black ${location.pathname === "/product" ? "border-b-2 border-black font-bold text-black" : ""}`}
          >
            Product
          </Link>
          <Link
            to="/cart"
            className={`text-gray-600 hover:text-black ${location.pathname === "/cart" ? "border-b-2 border-black font-bold text-black" : ""}`}
          >
            Cart
          </Link>
          <Link
            to="/profile"
            className={`text-gray-600 hover:text-black ${location.pathname === "/profile" ? "border-b-2 border-black font-bold text-black" : ""}`}
          >
            Profile
          </Link>
        </>
      )}
    </div>
  );
};

export default NavLinks;
