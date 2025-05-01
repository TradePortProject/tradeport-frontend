import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts } from '../posts/getPost';
import { ShoppingCart } from '../posts/types';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "../posts/ValidationError";
import { ShoppingCartPost } from '../posts/shoppingCartPost';
import { useSelector } from 'react-redux'; // Import useSelector for Redux
import { RootState } from '../store/store';
import ENDPOINTS from '../config/apiConfig';
import PlusIcon from '../assets/icons/Plusicon.svg';
import NegIcon from '../assets/icons/Negativeicon.svg';


export function ProductDetail() {
  const {
      handleSubmit,
      setValue,
      formState: {errors},
    } = useForm<ShoppingCart>();
  const navigate = useNavigate();
  const {productID } = useParams<{ productID: string }>();
  const [post, setPost] = useState<ShoppingCart | null>(null);
  const [orderquantity, setOrderQuantity] = useState<number>(1);
  const token = useSelector((state: RootState) => state.auth.token); 

  const userID = useSelector((state: RootState) => state.auth.user?.userID); // Access userID from the Redux store
  console.log('userID:', userID);
  const onSubmit = async (order: ShoppingCart): Promise<void> => {
      order.productID = productID || '';
      order.productName = post?.productName || '';
      order.description = post?.description || '';
      order.category = post?.category || '';
      order.retailPrice = post?.retailPrice || '';
      order.retailCurrency = post?.retailCurrency || '';
      order.wholesalePrice = post?.wholesalePrice || '';
      order.wholeSaleCurrency = post?.wholeSaleCurrency || '';
      order.quantity = post?.quantity || 0;
      order.retailerID = userID || '';
      order.manufacturerID = post?.manufacturerID || '';
      order.shippingCost = post?.shippingCost || 0;
      order.paymentMode = post?.paymentMode || 1;
      order.paymentCurrency = post?.paymentCurrency || 'SGD';
      order.shippingCurrency = post?.shippingCurrency || 'SGD';
      order.shippingAddress = post?.shippingAddress || '';
      order.orderQuantity = orderquantity||0;
      
      console.log("Submitted details:", order);
      try {
        const body = await ShoppingCartPost(order,token);
        console.log("response:", body);
        navigate(`/Cart`);
      } catch (error) {
        console.error("Error saving post:", error);
      }
    };

  useEffect(() => {
    const fetchPost = async () => {
      if (!productID) {
        console.error("Product ID is undefined");
        return;
      }
      if (!token) {
        console.error("Token is required to fetch the post.");
        return;
      }
      
      const postsData = await getPosts(productID, token);
      const selectedPost = postsData.find((p) => p.productID === productID);
      setPost(selectedPost ? { ...selectedPost, orderQuantity: Number(selectedPost.orderQuantity)} : null);
      if (selectedPost) {
        setValue("orderQuantity", Number(selectedPost.orderQuantity));
      }
    };
    fetchPost();
  }, [productID, setValue]);

  if (!post) {
    return <div>No product details available.</div>;
  }

  const handleQuantityChange = (change: number) => {
    setOrderQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
    setValue("orderQuantity", (orderquantity + change));
  };

  const productImageUrl = post.productImage && post.productImage.length > 0 ? post.productImage[0].productImageURL : '/images/headphone.png';

  return (
    <form 
    noValidate
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-4"
  >
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">
        <div className="flex justify-center">
          <img
            src={ENDPOINTS.PRODUCT.IMAGE(productImageUrl)}
            alt={post.productName}
            className="mx-auto duration-200 w-40 sm:w-60 hover:scale-105"
          />
        </div>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
            <div>
              <div className="inline-block px-3 py-1 text-sm text-white bg-black rounded-full">
                {post.shippingCost > 0 ? 'Shipping Cost $' + post.shippingCost : 'Free Shipping'}
              </div>
            </div>
            <div className="max-w-sm text-xl sm:text-2xl font-medium">
              {post.productName} 
            </div>
            <div className="flex flex-col mb-4 space-y-3 text-center md:text-left" id='productDetails'>
            <p className="text-xs sm:text-sm font-light text-gray-400 max-w-xs sm:max-w-sm mx-auto md:mx-0">
                {post.description}
              </p>  
              <p className="text-lg sm:text-xl font-bold">
                ${post.wholesalePrice}.00 
                <span className="text-gray-400 line-through text-xs sm:text-base ml-2">
                  ${post.retailPrice}.00
                </span>
              </p>
                                        
            </div>
            <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center space-x-3">
                <div data-svg-wrapper style={{position: 'relative'}}>
                <button type="button" onClick={() => handleQuantityChange(-1)} className="p-1">
                <img src={NegIcon}    alt="Quantity" className="h-5 w-5 mr-2" />
                </button>
                </div>
                <div className="flex items-center justify-center w-10 h-10 text-sm sm:text-xl  bg-gray-100 rounded-lg">           
                {orderquantity}</div>
                <div data-svg-wrapper style={{position: 'relative'}}>
                <button type="button" onClick={() => handleQuantityChange(1)} className="p-1">
                <img src={PlusIcon}   alt="Quantity" className="h-5 w-5 mr-2" />
                  
                </button>
              </div>
            </div>
          </div>
            <ValidationError fieldError={errors.orderQuantity} />
            <div className="group" id="purchaseButton">
              
            </div>
            <div className="flex items-center space-x-3 group" id="stockDetails">
              <div className="text-xs sm:text-sm font-bold text-gray-400">{post.quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>
            </div>
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row" id="supplierDetails">
            <button className="w-full transition-all duration-150 bg-blue-700 text-white rounded-lg hover:shadow-lg">
                <div className="px-6 sm:px-8 py-3 sm:py-4 duration-150 bg-blue-700 rounded-lg">
                  Purchase Now
                </div>
              </button>
              
            
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
}