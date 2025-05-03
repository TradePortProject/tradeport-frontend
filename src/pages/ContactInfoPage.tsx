import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "../assets/icons/shopping-cart.svg";
import ContactInfo from "../assets/icons/contactinfo.svg";
import { orderPost } from "../posts/orderPost";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ShoppingCart } from "../posts/types";
import { clearCart } from "../store/features/cartSlice";
import { useForm, SubmitHandler } from "react-hook-form"; // Import useForm and SubmitHandler for validation

// Define a type for the form data
interface ContactFormData {
  shippingAddress: string;
  pinCode: string;
}

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
  const token = useSelector((state: RootState) => state.auth.token); 
  const [isLoading, setIsLoading] = useState(false); // Add loader state

  // Pass the type to useForm
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

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

  // Update the onSubmit function to use the typed form data
  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (!posts) return;
    console.log("Submitted details:", posts);
    try {
      setIsLoading(true); // Show loader
      const updatedPosts = posts.map((post) => ({
        ...post,
        shippingAddress: data.shippingAddress,
        paymentInfo: { cardNumber },
      }));
      if (!token) {
        throw new Error("Token is required for this operation.");
      }
      const body = await orderPost(updatedPosts, token);
      console.log("response:", body);
      // Clear the cart after successful order
      dispatch(clearCart());
      navigate(`/orders`); // Navigate to Order Summary page
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
       
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
                {...register("shippingAddress", { required: "Address is required" })}
                value={shippingAddress}
                onChange={handleAddressChange}
                className="rounded-lg border-2 border-gray-300 p-2 px-4 text-center placeholder:text-xs md:placeholder:text-sm"
              />
              {errors.shippingAddress && (
                <p className="text-red-500 text-xs">{"Address is required"}</p>
              )}
              <p className="text-xs sm:text-sm font-bold">
                PinCode
              </p>
              <input
                type="text"
                id="PinCode"
                placeholder={"PinCode"}
                {...register("pinCode", { required: "PinCode is required" })}
                className="rounded-lg border-2 border-gray-300 p-2 px-4 text-center placeholder:text-xs md:placeholder:text-sm"
              />
              {errors.pinCode && (
                <p className="text-red-500 text-xs">{"PinCode is required"}</p>
              )}
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
            <button
              type="submit"
              className="flex items-center justify-center w-full lg:w-[300px] p-2.5 bg-gray-900 rounded border border-lime-500 cursor-pointer"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <div className="text-lg font-medium text-center text-white cursor-pointer">
                  Loading...
                </div>
              ) : (
                <div className="text-lg font-medium text-center text-white cursor-pointer">
                  Checkout
                </div>
              )}
            </button>
          </div>
        </div>
    
      
     </div>
    </form>
  );
}


