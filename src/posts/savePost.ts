import { Product } from './types';

export async function savePost(newPostData: Product, image: File | null) {
  const apiUrl = 'http://localhost:3016/api/ProductManagement';

  try {
  const formData = new FormData();
  newPostData.manufacturerId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  newPostData.shippingCost = 30;

	formData.append('manufacturerId', newPostData.manufacturerId);
  formData.append('shippingCost', newPostData.shippingCost.toString());
  formData.append('category', newPostData.category);
  formData.append('description', newPostData.description);
  formData.append('productName', newPostData.productName);
	formData.append('retailPrice', newPostData.retailPrice);
  formData.append('retailCurrency', newPostData.retailCurrency);
  formData.append('wholesalePrice', newPostData.wholesalePrice);
	formData.append('wholeSaleCurrency', newPostData.wholeSaleCurrency);
	formData.append('quantity', newPostData.quantity.toString());


    if (image) {
      formData.append('productImage', image);
    } else {
      formData.append('productImage', '');
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
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
