import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import CartIcon from "./CartIcon";
import ProfileDropdown from "./ProfileDropdown";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2 sm:px-6 lg:px-8">
        <MobileMenu />
        <NavLinks />
        <div className="flex items-center space-x-4">
          <CartIcon />
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
