import { useEffect, useState } from "react";


import { ShoppingCart } from "../posts/types";
import { orderPost } from "../posts/orderPost";
import { useNavigate } from "react-router-dom";
import { getShoppingPosts } from "../posts/getShoppingPosts";
import { useSelector } from 'react-redux'; // Import useSelector for Redux
import { RootState } from '../store/store';
import { TrashIcon } from "../components/TrashIcon.tsx"; // Adjust the path as needed
import { removeFromCartShoppingPosts } from "../posts/removeFromCartShoppingPosts.ts";


export function ShoppingPage() {
  
  const navigate = useNavigate();
  const [posts, setPosts] = useState<ShoppingCart[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const retailerID = useSelector((state: RootState) => state.auth.user?.userID); // Access userID from the Redux store
  console.log('userID:', retailerID);
  useEffect(() => {
     const fetchPost = async () => {
       if (!retailerID) {
         console.error("retailer ID is undefined");
         return;
       }
       const postsData = await getShoppingPosts(retailerID);
       setPosts(postsData);
       calculateTotal(postsData);
     };
     fetchPost();
   }, [retailerID]);

   const calculateTotal = (posts: ShoppingCart[]) => {
    const total = posts.reduce((sum, post) => sum + (Number(post.productPrice) * Number(post.orderQuantity)), 0);
  
    setTotalPrice(total);
  };

   const onSubmit = async (posts: ShoppingCart[]): Promise<void> => {
         console.log("Submitted details:", posts);
         try {
           const body = await orderPost(posts);
           console.log("response:", body);
           navigate(`/catalogGrid`);
         } catch (error) {
           console.error("Error saving post:", error);
         }
       };

   const removePost = async (cartID: string ) => {
     if (!posts) return;
     try {
          const removedPosts =  await removeFromCartShoppingPosts(cartID);     
          const updatedPosts = posts.filter(post => post.cartID !== cartID);
          setPosts(updatedPosts);
          calculateTotal(updatedPosts);
        } 
    catch (error) {
      console.error("Error removing Cart:", error);
    }
   };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-4 lg:gap-10 py-10 lg:py-20 min-h-screen mx-4 lg:mx-10">
      <div className="flex flex-col items-start justify-start w-full lg:w-auto">
        <div className="grid grid-cols-5 lg:grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-2 lg:gap-4 w-full pb-6 border-b border-gray-400">
          <div className="text-lg font-semibold text-gray-900 pr-4 lg:pr-12">Product</div>
          <div className="text-lg font-semibold text-gray-900">Quantity</div>
          <div className="text-lg font-semibold text-gray-900">Price</div>
          <div className="text-lg font-semibold text-gray-900">Subtotal</div>
          <div className="text-lg font-semibold text-gray-900"></div>
        </div>
        {/* Grid Layout */}
        <div className="grid grid-cols-5 lg:grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-2 lg:gap-4 w-full py-6 border-b border-gray-200">
        { posts && posts.length > 0 && posts.map((post) => (
          console.log('post:', post),
          <><div className="flex items-center text-base font-normal text-gray-900 pr-4 lg:pr-12" key={post.cartID}>
                {post.productName}
            </div><div className="text-base font-normal text-gray-900 text-center">{post.orderQuantity}</div>
            <div className="text-base font-normal text-gray-900">${post.productPrice}</div>
            <div className="text-base font-normal text-gray-900">${Number(post.productPrice) * Number(post.orderQuantity)}
                      
                    
            </div>
            <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => removePost(post.cartID)}>
              <TrashIcon />
            </button>
          </>
        ))}
        </div>        
      </div>
      <div className="flex flex-col items-start justify-center gap-4 p-6 bg-white rounded lg:w-[300px] border border-black mx-auto lg:mx-0">
        <div className="self-stretch text-xl font-medium text-gray-900">Cart summary</div>
        <div className="grid grid-cols-2 gap-2 w-full border-b-2 border-black">
          <div className="text-lg font-normal text-gray-900">Free shipping</div>
          <div className="text-lg font-normal text-right text-gray-900">$0.00</div>
          <div className="text-lg font-normal text-gray-900 border-b border-gray-200">SubTotal</div>
          <div className="text-lg font-normal text-right text-gray-900 border-b border-gray-200">${totalPrice.toFixed(2)}</div>
          <div className="text-lg font-normal text-gray-900">Total</div>
          <div className="text-lg font-normal text-right text-gray-900">${totalPrice.toFixed(2)}</div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-[300px] p-2.5 bg-gray-900 rounded border border-lime-500" onClick={() => posts && onSubmit(posts)}>
          <div className="text-lg font-medium text-center text-white">Checkout</div>
        </div>
      </div>
    </div>
  );
}


