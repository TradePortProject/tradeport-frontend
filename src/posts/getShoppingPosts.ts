import {ShoppingCart } from './types';

export async function getShoppingPosts(productID: string): Promise<ShoppingCart[]> {
  
  const apiUrl = `http://localhost:3017/api/OrderManagement/GetShoppingCart/${productID}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log('Data:', data.cartDetails);
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
 
  postsData.forEach(post => {
    if (!post.productId) {
      throw new Error("post is missing an id");
    }
  });
}