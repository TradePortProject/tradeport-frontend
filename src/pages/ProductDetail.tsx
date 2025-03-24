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
        const body = await ShoppingCartPost(order);
        console.log("response:", body);
        navigate(`/catalogGrid`);
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
      const postsData = await getPosts(productID);
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
            src={`http://localhost:3016${productImageUrl}`}
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
              {post.productName} {post.productID}
            </div>
            <div className="flex flex-col mb-4 space-y-3 text-center md:text-left" id='productDetails'>
              <p className="text-lg sm:text-xl font-bold">WholeSale ${post.wholesalePrice}</p>
              <p className="text-sm sm:text-base font-bold">Retail ${post.retailPrice}</p>
              <p className="text-xs sm:text-sm font-light text-gray-400">
                {post.description}
              </p>                            
            </div>
            <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center space-x-3">
                <div data-svg-wrapper style={{position: 'relative'}}>
                <button type="button" onClick={() => handleQuantityChange(-1)} className="p-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.03662 10H15.7033" stroke="#121212" stroke-width="0.9375" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                </div>
                <div className="flex items-center justify-center w-10 h-10 text-lg sm:text-xl font-bold text-gray-700 bg-gray-100 rounded-lg">           
                {orderquantity}</div>
                <div data-svg-wrapper style={{position: 'relative'}}>
                <button type="button" onClick={() => handleQuantityChange(1)} className="p-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4686 4.16669C10.4686 3.9078 10.2587 3.69794 9.99984 3.69794C9.74096 3.69794 9.53109 3.9078 9.53109 4.16669V9.53127H4.1665C3.90762 9.53127 3.69775 9.74114 3.69775 10C3.69775 10.2589 3.90762 10.4688 4.1665 10.4688H9.53109V15.8334C9.53109 16.0922 9.74096 16.3021 9.99984 16.3021C10.2587 16.3021 10.4686 16.0922 10.4686 15.8334V10.4688H15.8332C16.0921 10.4688 16.3019 10.2589 16.3019 10C16.3019 9.74114 16.0921 9.53127 15.8332 9.53127H10.4686V4.16669Z" fill="#121212"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
            <ValidationError fieldError={errors.orderQuantity} />
            <div className="group" id="purchaseButton">
              <button className="w-full transition-all duration-150 bg-blue-700 text-white border-b-8 border-b-blue-700 rounded-lg group-hover:border-t-8 group-hover:border-b-0 group-hover:bg-blue-700 group-hover:border-t-blue-700 group-hover:shadow-lg">
                <div className="px-6 sm:px-8 py-3 sm:py-4 duration-150 bg-blue-500 rounded-lg group-hover:bg-blue-700">
                  Purchase Now
                </div>
              </button>
            </div>
            <div className="flex items-center space-x-3 group" id="stockDetails">
              <div className="text-xs sm:text-sm font-bold text-gray-400">{post.quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>
            </div>
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row" id="supplierDetails">
              <button className="flex items-center justify-center py-2 sm:py-3 px-4 sm:px-5 space-x-3 border-2 border-gray-300 rounded-lg shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
                <img src="images/weight.png" alt="" className="w-6 sm:w-8" />
                <span className="text-xs sm:text-sm">Supplier Name </span>
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
}
