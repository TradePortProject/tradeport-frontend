import { Order } from './types';

export async function orderPost(newPostData: Order) {
  const apiUrl = 'http://localhost:3016/api/ProductManagement';
  try {
    console.log("newPostData:", newPostData);
    const payload = {
      retailerID: newPostData.retailerID,
      manufacturerID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      paymentMode: newPostData.paymentMode,
      paymentCurrency: newPostData.paymentCurrency,
      shippingCost: newPostData.shippingCost || 10,
      shippingCurrency: newPostData.shippingCurrency || 'SGD',
      shippingAddress: newPostData.shippingAddress, 
      createdBy:'3fa85f64-5717-4562-b3fc-2c963f66afa6',
      orderDetails: [
        {
          productID: newPostData.productID,
          quantity: newPostData.orderquantity,
          productPrice: newPostData.wholesalePrice,
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
