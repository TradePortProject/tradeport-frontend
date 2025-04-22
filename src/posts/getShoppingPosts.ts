import { ShoppingCart } from "./types";
import ENDPOINTS from "../config/apiConfig";

export async function getShoppingPosts(
  retailerID: string,token: string
): Promise<ShoppingCart[]> {
  const apiUrl = ENDPOINTS.ORDER.SHOPPING_CART.GET(retailerID);

  // const apiUrl = `http://localhost:3017/api/OrderManagement/GetShoppingCart/${retailerID}`;
  const response = await fetch(apiUrl,{
  headers: {
    'Authorization': `Bearer ${token}`, // Pass token as AuthBearer
    },
  });
  const data = await response.json();
  console.log("Data:", data.cartDetails);
  assertIsPosts(data.cartDetails);

  return data.cartDetails;
}

export function assertIsPosts(postsData: ShoppingCart[]) {
  if (!Array.isArray(postsData)) {
    throw new Error("posts isn't an array");
  }
  if (postsData.length === 0) {
    return;
  }

  postsData.forEach((post) => {
    if (!post.productID) {
      throw new Error("post is missing an id");
    }
  });
}
