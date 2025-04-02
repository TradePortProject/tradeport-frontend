import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "../assets/icons/shopping-cart.svg";
import ContactInfo from "../assets/icons/contactinfo.svg";
import { orderPost } from "../posts/orderPost";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ShoppingCart } from "../posts/types";
import { clearCart } from "../store/features/cartSlice";

export function ContactInfoPage() {
  const navigate = useNavigate();
  const postsData = useSelector((state: RootState) => state.cart.items);
  const [posts, setPosts] = useState<ShoppingCart[] | null>(null);
  const dispatch = useDispatch(); // Initialize useDispatch

  const retailerName = useSelector((state: RootState) => state.auth.user?.name);
  const retailerAdd = useSelector((state: RootState) => state.auth.user?.address);
  const retailerPhone = useSelector((state: RootState) => state.auth.user?.phoneNo);
  const retailerEmail = useSelector((state: RootState) => state.auth.user?.email);
  const [shippingAddress, setShippingAddress] = useState(retailerAdd || "");
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
      // Fetch shopping posts when retailerID changes
      const fetchPost = async () => { 
              setPosts(postsData);       
      };
      fetchPost();
    }, [postsData]);
    
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress(event.target.value);
  };

  // Handle card number change
  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value);
  };

   // Handle checkout submission
    const onSubmit = async (posts: ShoppingCart[]): Promise<void> => {
    console.log("Submitted details:", posts);
      try {
            const updatedPosts = posts.map((post) => ({
              ...post,
              shippingAddress,
              paymentInfo: { cardNumber },
            }));
            const body = await orderPost(updatedPosts);
            console.log("response:", body);
            // Clear the cart after successful order
            dispatch(clearCart()); // Uncomment if you have a clearCart action
            navigate(`/catalogGrid`);
      } catch (error) {
        console.error("Error saving post:", error);
      }
    };
  

  return (
    <form className="space-y-4">
       
      <div className="flex items-center border-10 justify-center min-h-screen bg-slate-100 px-4 sm:px-6 lg:px-8">
      
        <div className="flex flex-col mb-4 bg-slate-100 space-y-3 text-center md:text-left p-10 md:px-24">
          <div className="flex flex-col mb-4 border-black bg-slate-100 space-y-3 text-center md:text-left p-10 md:px-24">
            <div className="max-w-sm text-xl text-center sm:text-2xl font-medium">
              Check Out
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2  gap-4">
              <div className="text-sm sm:text-base  text-gray-400 font-bold flex items-center justify-center cursor-pointer"
              onClick={() => navigate("/cart")}>
                <img src={ShoppingCartIcon} alt="Shopping Cart" className="h-5 w-5 mr-2" />
                Shopping Cart
              </div>
              <div className="text-sm sm:text-base  text-green-400 font-bold flex items-center justify-center border-b" >
              <img src={ContactInfo} alt="Contact" className="h-5 w-5 mr-2" />
                Checkout Summary
              </div>
            </div>
          </div>
          
          <div className="flex flex-col mb-4 border-black bg-slate-100 border-2 space-y-3 text-center md:text-left p-10 md:px-24">
         
            <div className="max-w-sm text-xl sm:text-2xl font-medium">
              Contact Information
            </div>
            <div
              className="flex flex-col mb-4 space-y-3 text-center md:text-left"
              id="productDetails"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm sm:text-base font-bold">First Name</p>
                  <input
                    type="text"
                    id="FirstName"
                    placeholder={retailerName}
                    readOnly
                    className="rounded-lg border-2 border-gray-300 p-2 px-4 text-center placeholder:text-xs md:placeholder:text-sm"
                  />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold">Last Name</p>
                  <input
                    type="text"
                    id="LastName"
                    placeholder="Last Name"
                    readOnly
                    className="rounded-lg border-2 border-gray-300 p-2 px-4 text-center placeholder:text-xs md:placeholder:text-sm"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm font-bold">
                Phone Number
              </p>
              <input
                type="text"
                id="Phone Number"
                placeholder={retailerPhone}
                readOnly
                className="rounded-lg border-2 border-gray-300 p-2 px-4 text-center placeholder:text-xs md:placeholder:text-sm"
              />
              <p className="text-xs sm:text-sm font-bold">
                Email Address
              </p>
              <input
                type="text"
                id="Email Address"
                placeholder={retailerEmail}
                readOnly
                className="rounded-lg border-2 border-gray-300 p-2 px-4 text-center placeholder:text-xs md:placeholder:text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4 border-black border-2 space-y-3 text-center md:text-left p-10 md:px-24">
            <div className="max-w-sm text-xl sm:text-2xl font-medium">
              Shipping Information
            </div>
            <div
              className="flex flex-col mb-4 space-y-3 text-center md:text-left"
              id="Shipping Information"
            >
             
              <p className="text-xs sm:text-sm font-bold">
                Address
              </p>
              <input
                type="text"
                id="Address"
                placeholder={retailerAdd}
                value={shippingAddress}
                onChange={handleAddressChange}
                className="rounded-lg border-2 border-gray-300 p-2 px-4 text-center placeholder:text-xs md:placeholder:text-sm"
              />
              <p className="text-xs sm:text-sm font-bold">
                PinCode
              </p>
              <input
                type="text"
                id="PinCode"
                placeholder={"PinCode"}
                className="rounded-lg border-2 border-gray-300 p-2 px-4 text-center placeholder:text-xs md:placeholder:text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4 border-black border-2 space-y-3 text-center md:text-left p-10 md:px-24">
            <div className="max-w-sm text-xl sm:text-2xl font-medium">
              Payment Information
            </div>
            <p className="text-xs sm:text-sm font-bold">
              Card Number
            </p>
            <input
              type="text"
              id="Card Number"
              placeholder="Card Number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="rounded-lg border-2 border-gray-300 p-2 px-4 text-center placeholder:text-xs md:placeholder:text-sm"
            />
            <p className="text-xs sm:text-sm font-bold">
              Cart Holder name
            </p>
            <input
              type="text"
              id="Card Holder Name"
              placeholder="Card Holder Name"
              className="rounded-lg border-2 border-gray-300 p-2 px-4 text-center placeholder:text-xs md:placeholder:text-sm"
            />
          </div> 

        
          <div className="flex flex-col mb-4 border-black border-2 space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center w-full lg:w-[300px] p-2.5 bg-gray-900 rounded border border-lime-500">
              <div className="text-lg font-medium text-center text-white" onClick={() => posts && onSubmit(posts)}>
                Checkout
              </div>
            </div>
          </div>
        </div>
    
      
     </div>
    </form>
  );
}


