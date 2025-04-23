import { ShoppingCart } from "./types";
import ENDPOINTS from "../config/apiConfig";


export async function removeFromCartShoppingPosts(
  CartID: string,token: string
): Promise<ShoppingCart[]> {
  const apiUrl = ENDPOINTS.ORDER.SHOPPING_CART.DELETE_ITEM(CartID);
  // const apiUrl = `http://localhost:3017/api/OrderManagement/DeleteCartItemByID/?CartID=${CartID}`;
  

  const response = await fetch(apiUrl, { 
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to save post");
  }
  console.log("Data:", data);

  return data;
}
