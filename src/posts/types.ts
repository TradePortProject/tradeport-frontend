

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
    manufacturerId: string;
    shippingCost: number;
    productimage: File | null;
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