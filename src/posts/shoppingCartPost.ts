import {ShoppingCart } from './types';

const apiUrl = process.env.REACT_APP_PRODUCT_API_URL || 'http://localhost:3017/api/OrderManagement/CreateShoppingCart';

export async function ShoppingCartPost(newPostData: ShoppingCart) {
  try {
    console.log("API URL:", apiUrl);
    const payload = {      
          
          productID: newPostData.productID,
          retailerID: newPostData.retailerID,
          manufacturerID: newPostData.manufacturerID,
          orderQuantity: newPostData.orderQuantity,
          productPrice: newPostData.wholesalePrice,                
      
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to save post');
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error('Error in Connecting to the endpoint:', error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'An unknown error occurred' };
    }
  }
}
