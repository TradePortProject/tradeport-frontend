import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import CartIcon from "./CartIcon";
import ProfileDropdown from "./ProfileDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ✅ Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">
              TradePort
            </Link>
          </div>

          {/* ✅ Center: Desktop Navigation Links */}
          <div className="hidden flex-grow justify-center sm:flex">
            <NavLinks />
          </div>

          {/* ✅ Right: Cart, Profile & Login (Desktop Only) */}
          <div className="flex items-center space-x-4">
            <CartIcon />
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <Link
                to="/login"
                className="hidden rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 hover:text-black sm:block"
              >
                Log in →
              </Link>
            )}
          </div>

          {/* ✅ Mobile Menu (Only Visible in Small Screens) */}
          <div className="sm:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
