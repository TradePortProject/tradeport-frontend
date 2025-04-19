import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addToCart, removeFromCart } from '../store/features/cartSlice.ts'; // Import the action

import { ShoppingCart } from "../posts/types";

import { useNavigate } from "react-router-dom";
import { getShoppingPosts } from "../posts/getShoppingPosts";
import { useSelector } from 'react-redux'; // Import useSelector for Redux
import { RootState } from '../store/store';
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
  console.log('userID:', retailerID);

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
        postsData.forEach(post => dispatch(addToCart(post))); // Dispatch each post individually
      }
    };
    fetchPost();
  }, [dispatch, retailerID]);

  // Calculate total price of items in the cart
  const calculateTotal = (posts: ShoppingCart[]) => {
    const total = posts.reduce((sum, post) => sum + (Number(post.productPrice) * Number(post.orderQuantity)), 0);
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
      const updatedPosts = posts.filter(post => post.cartID !== cartID);
      setPosts(updatedPosts);
      calculateTotal(updatedPosts);
      dispatch(removeFromCart(cartID)); // Dispatch the action to remove from Redux store
      console.log("Removed posts:", removedPosts);
    } catch (error) {
      console.error("Error removing Cart:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-10 lg:py-10 min-h-screen mx-4 lg:mx-10">

          <div className="flex flex-col mb-4 border-black bg-slate-100 space-y-3 text-center md:text-left p-10 md:px-24">
            <div className="max-w-sm text-xl text-center sm:text-2xl font-medium">
              Check Out
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2  gap-4">
              <div className="text-sm sm:text-base  text-green-400 font-bold flex items-center justify-center border-b cursor-pointer"
              onClick={() => navigate("/cart")}>
                <img src={ShoppingCartIcon} alt="Shopping Cart" className="h-5 w-5 mr-2" />
                Shopping Cart
              </div>
              <div className="text-sm sm:text-base  text-gray-400  font-bold flex items-center justify-center  cursor-pointer" onClick={() => navigate("/contact")}>
              <img src={ContactInfo} alt="Contact" className="h-5 w-5 mr-2" />
                Checkout Summary
              </div>
            </div>
          </div>
     

      {/* Product List Section */}
      <div className="flex flex-col lg:flex-row justify-center gap-5 w-full">
        <div className="flex flex-col w-full lg:w-auto gap-4 bg-white rounded-lg p-4 sm:p-6  ">
          {/* Header Row */}
          <div className="grid grid-cols-5 lg:grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-2 lg:gap-4 w-full pb-6 border-b border-gray-400">
            <div className="text-sm sm:text-lg font-semibold text-gray-900 pr-4 lg:pr-12">Product</div>
            <div className="text-sm sm:text-lg font-semibold text-gray-900">Quantity</div>
            <div className="text-sm sm:text-lg font-semibold text-gray-900">Price</div>
            <div className="text-sm sm:text-lg font-semibold text-gray-900">Subtotal</div>
            <div className="text-sm sm:text-lg font-semibold text-gray-900"></div>
          </div>
          {/* Product Rows */}
          <div className="grid grid-cols-5 lg:grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-2 lg:gap-4 w-full py-6 border-b border-gray-200">
            {posts && posts.length > 0 && posts.map((post) => (
              <>
                <div className="flex items-center text-base font-normal text-gray-900 pr-4 lg:pr-12" key={post.cartID}>
                  {post.productName}
                </div>
                <div className="text-base font-normal text-gray-900 text-center">{post.orderQuantity}</div>
                <div className="text-base font-normal text-gray-900">${post.productPrice}</div>
                <div className="text-base font-normal text-gray-900">${Number(post.productPrice) * Number(post.orderQuantity)}</div>
                <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => removePost(post.cartID)}>
                  <TrashIcon />
                </button>
              </>
            ))}
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="flex flex-col items-start justify-center gap-4 p-4 sm:p-6 rounded w-full sm:w-auto lg:w-[300px] border border-black mx-auto lg:mx-0 shadow-md">
          <div className="self-stretch text-lg sm:text-xl font-medium text-gray-900">Cart summary</div>
          <div className="grid grid-cols-2 gap-2 w-full border-b-2 border-black">
            <div className="text-sm sm:text-lg font-normal text-gray-900">Free shipping</div>
            <div className="text-sm sm:text-lg font-normal text-right text-gray-900">$0.00</div>
            <div className="text-sm sm:text-lg font-normal text-gray-900 border-b border-gray-200">SubTotal</div>
            <div className="text-sm sm:text-lg font-normal text-right text-gray-900 border-b border-gray-200">${totalPrice.toFixed(2)}</div>
            <div className="text-sm sm:text-lg font-normal text-gray-900">Total</div>
            <div className="text-sm sm:text-lg font-normal text-right text-gray-900">${totalPrice.toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-center w-full lg:w-[300px] p-2.5 bg-gray-900 rounded border border-lime-500 cursor-pointer" onClick={() => posts && onSubmit(posts)}>
            <div className="text-sm sm:text-lg font-medium text-center text-white">Checkout</div>
          </div>
        </div>
      </div>
    </div>
  );
}


