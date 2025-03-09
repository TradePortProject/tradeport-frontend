import { Order } from './types';

const apiUrl = process.env.REACT_APP_PRODUCT_API_URL || 'http://localhost:3017/api/OrderManagement/';

export async function orderPost(newPostData: Order[]) {
  try {
    console.log("API URL:", apiUrl);
    const payload = {
      retailerID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      manufacturerID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      paymentMode: newPostData[0].paymentMode,
      paymentCurrency: newPostData[0].paymentCurrency,
      shippingCost: newPostData[0].shippingCost || 10,
      shippingCurrency: newPostData[0].shippingCurrency || 'SGD',
      shippingAddress: newPostData[0].shippingAddress, 
      createdBy:'3fa85f64-5717-4562-b3fc-2c963f66afa6',
      orderDetails: [
        {
          productID: newPostData[0].productID,
          quantity: newPostData[0].orderquantity,
          productPrice: newPostData[0].wholesalePrice,
        },
      ],
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
