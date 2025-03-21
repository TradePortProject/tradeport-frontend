import { useForm } from "react-hook-form";
import { Product, SavedPost } from "../posts/types";
import { useNavigate } from "react-router-dom";
import { savePost } from "../posts/savePost";
import { ValidationError } from "../posts/ValidationError";
import { useState } from "react";
import { RootState } from '../store/store';
import { useSelector } from "react-redux";

export function ProductMaster() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const userID = useSelector((state: RootState) => state.auth.user?.userID); // Access userID from the Redux store
  
  const onSubmit = async (product: Product): Promise<void> => {
    console.log("Submitted details:", product);
    try {
      product.manufacturerID = userID || '3fa85f64-5717-4562-b3fc-2c963f66afa6';
      const body: SavedPost = await savePost(product, image);
      console.log("response:", body);
      navigate(`/thank-you`);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
 
    <div className="flex items-center justify-center flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl md:p-20">
        <div className="flex flex-col justify-center space-y-5">
          <h2 className="text-center font-serif text-xl font-medium text-black">
            Product Master
          </h2>
          <p className="text-black-500 text-center font-serif">
            Add New Products
          </p>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <input
                type="text"
                id="productName"
                placeholder="Product Name"
                className="rounded-lg border-2 border-gray-300 p-2 px-4 text-center placeholder:text-xs md:placeholder:text-sm"
                {...register("productName", {
                  required: "You must enter Product Name",
                })}
              />
            </div>
            <ValidationError fieldError={errors.productName} />
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <textarea
                id="description"
                className="rounded-lg border-2 border-gray-300 p-2 text-sm"
                placeholder="Description"
                {...register("description", {
                  required: "You must enter Description",
                })}
              ></textarea>
            </div>
            <ValidationError fieldError={errors.description} />
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <select
                id="category"
                className="rounded-lg border-2 border-gray-300 p-2"
                {...register("category", {
                  required: "You must select a category",
                })}
              >
                <option value="">Select Category</option>
                <option value="101">Furniture</option>
                <option value="102">Fashion</option>
                <option value="103">Home&Garden</option>
                <option value="104">Health&Beauty</option>
                <option value="105">Computer&Office</option>
              </select>
            </div>
            <ValidationError fieldError={errors.category} />
            <div className="flex flex-row gap-x-2 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <input
                type="file"
                id="image"
                className="rounded-lg border-2 border-gray-300 p-2"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {imagePreview && (
              <div className="flex justify-center">
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="mt-4 h-auto max-w-full"
                />
              </div>
            )}
          
            <div className="flex flex-row gap-x-2 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <input
                id="retailPrice"
                type="number"
                className="rounded-lg border-2 border-gray-300 p-2"
                placeholder="Retail Price"
                {...register("retailPrice", {
                  required: "You must enter Retail Price",
                })}
              />
              <select
                id="retailcurrency"
                className="rounded-lg border-2 border-gray-300 p-2"
                {...register("retailCurrency", {
                  required: "You must select a currency",
                })}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
            <ValidationError fieldError={errors.retailPrice} />
            <ValidationError fieldError={errors.retailCurrency} />
            <div className="flex flex-row gap-x-2 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <input
                type="number"
                id="wholesaleprice"
                className="rounded-lg border-2 border-gray-300 p-2"
                placeholder="Wholesale Price"
                {...register("wholesalePrice", {
                  required: "You must enter Wholesale Price",
                })}
              />
              <select
                id="wholesalecurrency"
                className="rounded-lg border-2 border-gray-300 p-2"
                {...register("wholeSaleCurrency", {
                  required: "You must select a currency",
                })}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
            <ValidationError fieldError={errors.wholeSaleCurrency} />
            <ValidationError fieldError={errors.wholesalePrice} />
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <input
                type="number"
                id="stock"
                className="rounded-lg border-2 border-gray-300 p-2"
                placeholder="Stock"
                {...register("quantity", { required: "You must enter Stock" })}
              />
            </div>
            <ValidationError fieldError={errors.quantity} />
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <button
                type="submit"
                className="rounded-md border-gray-300 bg-blue-500 px-5 py-3 text-xs text-white md:text-sm"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  
  );
}
