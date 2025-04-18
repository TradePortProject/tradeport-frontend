import { Product } from './types';
const apiUrl = `${import.meta.env.VITE_API_KEY}`;

export async function savePost(newPostData: Product, image: File | null) {
  

  try {
  const formData = new FormData();
  console.log("Environment Variable URL:", apiUrl);
  
  newPostData.shippingCost = 30;

	formData.append('manufacturerId', newPostData.manufacturerID);
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
