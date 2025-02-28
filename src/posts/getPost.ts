import { Order } from './types';

export async function getPosts(): Promise<Order[]> {
  const apiUrl = 'http://localhost:3016/api/ProductManagement';
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log('Data:', data.product);
  assertIsPosts(data.product);
  
  return data.product;
}

export function assertIsPosts(postsData: Order[]) {
  if (!Array.isArray(postsData)) {
    throw new Error("posts isn't an array");
  }
  if (postsData.length === 0) {
    return;
  }
 
  postsData.forEach(post => {
    if (!post.productID) {
      throw new Error("post is missing an id");
    }
  });
}