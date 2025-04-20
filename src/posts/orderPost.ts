import { ShoppingCart } from "./types";
import ENDPOINTS from "../config/apiConfig";
import { RootState } from '../store/store';


const apiUrl = ENDPOINTS.ORDER.ORDERS.CREATE;

export async function orderPost(newPostData: ShoppingCart[]) {
  try {
    console.log("API URL:", apiUrl);

    const token = (state: RootState) => state.auth?.token;
    

    const payload = {
      retailerID: newPostData[0].retailerID,
      paymentMode: newPostData[0].paymentMode,
      paymentCurrency: newPostData[0].paymentCurrency || "SGD",
      shippingCost: newPostData[0].shippingCost || 10,
      shippingCurrency: newPostData[0].shippingCurrency || "SGD",
      shippingAddress: newPostData[0].shippingAddress || "AMK",
      createdBy: newPostData[0].retailerID,
      orderDetails: createOrderDetails(newPostData),
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass token as AuthBearer
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to save post");
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error in Connecting to the endpoint:", error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}

export function createOrderDetails(
  newPostData: ShoppingCart[],
): OrderDetails[] {
  return newPostData.map((post) => ({
    productID: post.productID,
    Quantity: post.orderQuantity,
    productPrice: post.productPrice,
    subtotal: Number(post.productPrice) * Number(post.orderQuantity),
    manufacturerID: post.manufacturerID,
    cartID: post.cartID,
  }));
}

// Define the OrderDetails type
interface OrderDetails {
  productID: string;
  Quantity: number;
  productPrice: number;
  subtotal: number;
}
