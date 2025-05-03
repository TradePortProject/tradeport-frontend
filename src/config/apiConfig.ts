// API base URLs
const API_URLS = {
  PRODUCT_API: import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:3016",
  ORDER_API: import.meta.env.VITE_ORDER_API_URL || "http://localhost:3017",
  USER_API: import.meta.env.VITE_USER_API_URL || "http://localhost:7237",
  IMAGE_FALLBACK:
    import.meta.env.VITE_IMAGE_FALLBACK_URL ||
    "http://localhost:3001/img/image-missing.jpg",
};

// API Endpoints
export const ENDPOINTS = {
  // Product Management
  PRODUCT: {
    BASE: `${API_URLS.PRODUCT_API}/api/ProductManagement`,
    BY_ID: (id: string) =>
      `${API_URLS.PRODUCT_API}/api/ProductManagement/${id}`,
    FILTERED: (params: string) =>
      `${API_URLS.PRODUCT_API}/api/productManagement/GetFilteredProducts${params}`,
    IMAGE: (path: string) => `${API_URLS.PRODUCT_API}${path}`,
  },

  // Order Management
  ORDER: {
    BASE: `${API_URLS.ORDER_API}/api/OrderManagement`,
    SHOPPING_CART: {
      CREATE: `${API_URLS.ORDER_API}/api/OrderManagement/CreateShoppingCart`,
      GET: (retailerId: string) =>
        `${API_URLS.ORDER_API}/api/OrderManagement/GetShoppingCart/${retailerId}`,
      DELETE_ITEM: (cartId: string) =>
        `${API_URLS.ORDER_API}/api/OrderManagement/DeleteCartItemByID/?CartID=${cartId}`,
    },
    ORDERS: {
      CREATE: `${API_URLS.ORDER_API}/api/OrderManagement/CreateOrder`,
      GET: (params: string) =>
        `${API_URLS.ORDER_API}/api/OrderManagement/GetOrdersAndOrderDetails${params}`,
      ACCEPT_REJECT: `${API_URLS.ORDER_API}/api/OrderManagement/AcceptRejectOrder`,
      UPDATE_ORDER: `${API_URLS.ORDER_API}/api/OrderManagement/UpdateOrder`,
    },
  },

  // User Management
  USER: {
    REGISTER: `${API_URLS.USER_API}/api/User/registerUser`,
    VALIDATE_GOOGLE: `${API_URLS.USER_API}/api/User/validategoogleuser`,
  },

  // Images
  IMAGES: {
    FALLBACK: API_URLS.IMAGE_FALLBACK,
  },
};

export default ENDPOINTS;
