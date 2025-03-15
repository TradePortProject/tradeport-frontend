import { ShoppingCart } from './types';

const apiUrl = process.env.REACT_APP_PRODUCT_API_URL || 'http://localhost:3017/api/OrderManagement/CreateOrder';

export async function orderPost(newPostData: ShoppingCart[]) {
  try {
    console.log("API URL:", apiUrl);
    const payload = {
      retailerID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      paymentMode: newPostData[0].paymentMode,
      paymentCurrency: newPostData[0].paymentCurrency|| 'SGD',
      shippingCost: newPostData[0].shippingCost || 10,
      shippingCurrency: newPostData[0].shippingCurrency || 'SGD',
      shippingAddress: newPostData[0].shippingAddress|| 'AMK', 
      createdBy:'3fa85f64-5717-4562-b3fc-2c963f66afa6',
      orderDetails: createOrderDetails(newPostData),
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

export function createOrderDetails(newPostData: ShoppingCart[]): OrderDetails[] {
  return newPostData.map(post => ({
    productId: post.productId,
    orderQuantity: post.orderQuantity,
    productPrice: post.productPrice,
    subtotal: Number(post.productPrice) * Number(post.orderQuantity)
  }));
}

// Define the OrderDetails type
interface OrderDetails {
  productId: string;
  orderQuantity: number;
  productPrice: number;
  subtotal: number;
}
