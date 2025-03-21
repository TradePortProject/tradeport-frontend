

  export type SavedPost = {
    Message: string;
  };

  export type Product = {
    productName: string;
    description: string;
    category: string;
    retailPrice: string;
    retailCurrency: string;
    wholesalePrice: string;
    wholeSaleCurrency: string;
    quantity: number;
    retailerID: string;
    manufacturerID: string;
    shippingCost: number;
    productImage: string;
    productID: string;
  };

  export type Order = Product & {
    
    paymentMode: number;
    paymentCurrency: string;
    shippingCost: number;
    shippingCurrency: string;
    shippingAddress: string;
    orderquantity: string;
  };

  export type ShoppingCart = Product & {
    productId: string;
    paymentMode: number;
    paymentCurrency: string;
    shippingCost: number;
    shippingCurrency: string;
    shippingAddress: string;
    orderQuantity: number;
    productPrice: number;
    totalPrice: number;
    productImage: { productImageURL: string }[];
    cartID: string;
  };