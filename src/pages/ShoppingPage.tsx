import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addToCart, removeFromCart } from "../store/features/cartSlice.ts"; // Import the action
import { ShoppingCart } from "../posts/types";
import { useNavigate } from "react-router-dom";
import { getShoppingPosts } from "../posts/getShoppingPosts";
import { useSelector } from "react-redux"; // Import useSelector for Redux
import { RootState } from "../store/store";
import { TrashIcon } from "../components/TrashIcon.tsx"; // Adjust the path as needed
import { removeFromCartShoppingPosts } from "../posts/removeFromCartShoppingPosts.ts";
import ShoppingCartIcon from "../assets/icons/shopping-cart.svg";
import ContactInfo from "../assets/icons/contactinfo.svg";

export function ShoppingPage() {
  // State and Redux setup
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch
  const [posts, setPosts] = useState<ShoppingCart[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const retailerID = useSelector((state: RootState) => state.auth.user?.userID); // Access userID from the Redux store
  console.log("userID:", retailerID);

  useEffect(() => {
    // Fetch shopping posts when retailerID changes
    const fetchPost = async () => {
      if (!retailerID) {
        console.error("retailer ID is undefined");
        return;
      }
      const postsData = await getShoppingPosts(retailerID);
      setPosts(postsData);
      calculateTotal(postsData);
      if (postsData && Array.isArray(postsData)) {
        postsData.forEach((post) => dispatch(addToCart(post))); // Dispatch each post individually
      }
    };
    fetchPost();
  }, [dispatch, retailerID]);

  // Calculate total price of items in the cart
  const calculateTotal = (posts: ShoppingCart[]) => {
    const total = posts.reduce(
      (sum, post) =>
        sum + Number(post.productPrice) * Number(post.orderQuantity),
      0,
    );
    setTotalPrice(total);
  };

  // Handle checkout submission
  const onSubmit = async (posts: ShoppingCart[]): Promise<void> => {
    console.log("Submitted details:", posts);
    try {
      //const body = await orderPost(posts);
      //console.log("response:", body);
      navigate(`/Contact`);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  // Remove an item from the cart
  const removePost = async (cartID: string) => {
    if (!posts) return;
    try {
      const removedPosts = await removeFromCartShoppingPosts(cartID);
      const updatedPosts = posts.filter((post) => post.cartID !== cartID);
      setPosts(updatedPosts);
      calculateTotal(updatedPosts);
      dispatch(removeFromCart(cartID)); // Dispatch the action to remove from Redux store
      console.log("Removed posts:", removedPosts);
    } catch (error) {
      console.error("Error removing Cart:", error);
    }
  };

  return (
    <div className="mx-4 flex min-h-screen flex-col items-start gap-4 py-10 lg:mx-10 lg:py-10">
      {/* Header Section */}
      <div className="mb-4 flex w-full flex-row justify-center p-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex cursor-pointer items-center justify-center border-b text-sm font-bold text-green-400 sm:text-base">
            <img
              src={ShoppingCartIcon}
              alt="Shopping Cart"
              className="mr-2 h-5 w-5"
            />
            Shopping Cart
          </div>
          <div
            className="flex cursor-pointer items-center justify-center text-sm font-bold text-gray-400 sm:text-base"
            onClick={() => navigate("/Contact")}
          >
            <img src={ContactInfo} alt="Contact" className="mr-2 h-5 w-5" />
            Checkout Summary
          </div>
        </div>
      </div>

      {/* Product List Section */}
      <div className="flex w-full flex-col justify-center gap-5 lg:flex-row">
        <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 sm:p-6 lg:w-auto">
          {/* Header Row */}
          <div className="grid w-full grid-cols-5 gap-2 border-b border-gray-400 pb-6 lg:grid-cols-[3fr_1fr_1fr_1fr_1fr] lg:gap-4">
            <div className="pr-4 text-sm font-semibold text-gray-900 sm:text-lg lg:pr-12">
              Product
            </div>
            <div className="text-sm font-semibold text-gray-900 sm:text-lg">
              Quantity
            </div>
            <div className="text-sm font-semibold text-gray-900 sm:text-lg">
              Price
            </div>
            <div className="text-sm font-semibold text-gray-900 sm:text-lg">
              Subtotal
            </div>
            <div className="text-sm font-semibold text-gray-900 sm:text-lg"></div>
          </div>
          {/* Product Rows */}
          <div className="grid w-full grid-cols-5 gap-2 border-b border-gray-200 py-6 lg:grid-cols-[3fr_1fr_1fr_1fr_1fr] lg:gap-4">
            {posts &&
              posts.length > 0 &&
              posts.map((post) => (
                <>
                  <div
                    className="flex items-center pr-4 text-base font-normal text-gray-900 lg:pr-12"
                    key={post.cartID}
                  >
                    {post.productName}
                  </div>
                  <div className="text-center text-base font-normal text-gray-900">
                    {post.orderQuantity}
                  </div>
                  <div className="text-base font-normal text-gray-900">
                    ${post.productPrice}
                  </div>
                  <div className="text-base font-normal text-gray-900">
                    ${Number(post.productPrice) * Number(post.orderQuantity)}
                  </div>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => removePost(post.cartID)}
                  >
                    <TrashIcon />
                  </button>
                </>
              ))}
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="mx-auto flex w-full flex-col items-start justify-center gap-4 rounded border border-black p-4 shadow-md sm:w-auto sm:p-6 lg:mx-0 lg:w-[300px]">
          <div className="self-stretch text-lg font-medium text-gray-900 sm:text-xl">
            Cart summary
          </div>
          <div className="grid w-full grid-cols-2 gap-2 border-b-2 border-black">
            <div className="text-sm font-normal text-gray-900 sm:text-lg">
              Free shipping
            </div>
            <div className="text-right text-sm font-normal text-gray-900 sm:text-lg">
              $0.00
            </div>
            <div className="border-b border-gray-200 text-sm font-normal text-gray-900 sm:text-lg">
              SubTotal
            </div>
            <div className="border-b border-gray-200 text-right text-sm font-normal text-gray-900 sm:text-lg">
              ${totalPrice.toFixed(2)}
            </div>
            <div className="text-sm font-normal text-gray-900 sm:text-lg">
              Total
            </div>
            <div className="text-right text-sm font-normal text-gray-900 sm:text-lg">
              ${totalPrice.toFixed(2)}
            </div>
          </div>
          <div
            className="flex w-full cursor-pointer items-center justify-center rounded border border-lime-500 bg-gray-900 p-2.5 lg:w-[300px]"
            onClick={() => posts && onSubmit(posts)}
          >
            <div className="text-center text-sm font-medium text-white sm:text-lg">
              Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
