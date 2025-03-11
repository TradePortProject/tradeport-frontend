import { Link, useLocation } from "react-router-dom";
import navLinks from "../../config/navLinks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const NavLinks: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <div className="flex space-x-6">
      {navLinks.map(({ name, path, protected: isProtected }) => {
        if (isProtected && !isAuthenticated) return null; // Hide protected links if not logged in

        const isActive = location.pathname === path;
        return (
          <Link
            key={name}
            to={path}
            className={`text-gray-600 hover:text-black ${
              isActive ? "border-b-2 border-black font-bold text-black" : ""
            }`}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
