import { Product } from './types';

export async function savePost(newPostData: Product, image: File | null) {
  const apiUrl = 'http://localhost:3016/api/ProductManagement';
  //const apiUrl = 'http://localhost:3016/ProductManagement';
  try {
    const formData = new FormData();
    newPostData.manufacturerId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    newPostData.shippingCost = 30;
    formData.append('product', JSON.stringify(newPostData));
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        //const base64data = reader.result as string;
        //console.log('base64data:', base64data);
        newPostData.productimage = image;
        formData.append('product', JSON.stringify(newPostData));
        console.log('newPostData:', newPostData);
      };
    }
    else {
      newPostData.productimage = null;
      formData.append('product', JSON.stringify(newPostData));
    }

    const response = await fetch(apiUrl, {
      method: 'POST',      
      body: formData,
    });
    const body = await response.json();
    return { ...body };
  } catch (error) {
    console.error('Error in Connecting the endpoint:', error);
    return { error };
  }
}

