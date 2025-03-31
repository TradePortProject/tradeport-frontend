import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const CartIcon: React.FC = () => {
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.cartQuantity, 0),
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) return null; // Hide if user is not logged in

  return (
    <Link to="/cart" className="relative">
      <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-black" />
      {cartItemCount > 0 && (
        <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-xs text-white">
          {cartItemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
