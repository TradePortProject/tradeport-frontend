import { ShoppingCart } from './types';
import ENDPOINTS from '../config/apiConfig';

const apiUrl = ENDPOINTS.ORDER.SHOPPING_CART.CREATE;

export async function ShoppingCartPost(newPostData: ShoppingCart,token: string) {
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
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Pass token as AuthBearer
      },
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
