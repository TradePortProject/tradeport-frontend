import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts } from '../posts/getPost';
import { Order } from '../posts/types';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "../posts/ValidationError";
import { orderPost } from '../posts/orderPost';

export function ProductDetail() {
  const {
      register,
      handleSubmit,
      formState: {errors},
    } = useForm<Order>();
  const navigate = useNavigate();
  const { productID } = useParams<{ productID: string }>();
  const [post, setPost] = useState<Order | null>(null);
  const onSubmit = async (order: Order): Promise<void> => {
      order.productID = productID || '';
      order.productName = post?.productName || '';
      order.description = post?.description || '';
      order.category = post?.category || '';
      order.retailPrice = post?.retailPrice || '';
      order.retailCurrency = post?.retailCurrency || '';
      order.wholesalePrice = post?.wholesalePrice || '';
      order.wholeSaleCurrency = post?.wholeSaleCurrency || '';
      order.quantity = post?.quantity || 0;
      order.retailerID = post?.retailerID || '';
      order.manufacturerId = post?.manufacturerId || '';
      order.shippingCost = post?.shippingCost || 0;
      order.paymentMode = post?.paymentMode || 1;
      order.paymentCurrency = post?.paymentCurrency || 'SGD';
      order.shippingCurrency = post?.shippingCurrency || 'SGD';
      order.shippingAddress = post?.shippingAddress || '';

      console.log("Submitted details:", order);
      try {
        const body = await orderPost(order);
        console.log("response:", body);
        navigate(`/thank-you`);
      } catch (error) {
        console.error("Error saving post:", error);
      }
    };

  useEffect(() => {
    const fetchPost = async () => {
      const postsData = await getPosts();
      const selectedPost = postsData.find((p) => p.productID === productID);
      setPost(selectedPost || null);
    };
    fetchPost();
  }, [productID]);

  if (!post) {
    return <div>No product details available.</div>;
  }

  

  return (
    <form 
    noValidate
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-4"
  >
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="flex flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">
        <div>
          <img
            src={`/images/headphone.png`}
            alt={post.productName}
            className="mx-auto duration-200 w-60 hover:scale-105"
          />
        </div>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
            <div>
              <div className="inline-block px-3 py-1 text-sm text-white bg-black rounded-full">
                {post.shippingCost > 0 ? 'Shipping Cost $' + post.shippingCost : 'Free Shipping'}
              </div>
            </div>
            <div className="max-w-sm text-2xl font-medium">
              {post.productName}
            </div>
            <div className="flex flex-col mb-4 space-y-3 text-center md:text-left" id='productDetails'>
              <p className="text-xl font-bold">WholeSale ${post.wholesalePrice}</p>
              <p className="text-sm font-bold">Retail ${post.retailPrice}</p>
              <p className="text-sm font-light text-gray-400">
                {post.description}
              </p>                            
            </div>
            <div className="flex items-center space-x-3">
              <label htmlFor="quantity" className="text-sm font-bold text-gray-400">Quantity:</label>
              <input
                id="orderquantity"
                type="number"
                min="1"
                max="100"
                value={post.orderquantity}                
                className="rounded-lg border-2 border-gray-300 p-1"
                {...register("orderquantity", { required: "You must enter quantity" })}
              />
            </div>
            <ValidationError fieldError={errors.orderquantity} />
            <div className="group" id="purchaseButton">
              <button className="w-full transition-all duration-150 bg-blue-700 text-white border-b-8 border-b-blue-700 rounded-lg group-hover:border-t-8 group-hover:border-b-0 group-hover:bg-blue-700 group-hover:border-t-blue-700 group-hover:shadow-lg">
                <div className="px-8 py-4 duration-150 bg-blue-500 rounded-lg group-hover:bg-blue-700">
                  Purchase Now
                </div>
              </button>
            </div>
            <div className="flex items-center space-x-3 group" id="stockDetails">
              <div className="text-sm font-bold text-gray-400">{post.quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>
            </div>
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row" id="supplierDetails">
              <button className="flex items-center justify-center py-3 px-5 space-x-3 border-2 border-gray-300 rounded-lg shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
                <img src="images/weight.png" alt="" className="w-8" />
                <span>Supplier Name </span>
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
}
