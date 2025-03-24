import {ShoppingCart } from './types';

export async function removeFromCartShoppingPosts(CartID: string): Promise<ShoppingCart[]> {
  
 
  const apiUrl = `http://localhost:3017/api/OrderManagement/DeleteCartItemByID/?CartID=${CartID}`;
  const response = await fetch(apiUrl, { method: 'PUT' });
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Failed to save post');   
  }
  console.log('Data:', data);  
  
  return data;
}

