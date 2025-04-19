# Environment Variable Management in TradePort Frontend

This document explains how environment variables are managed in the TradePort Frontend application to support different environments (development, testing, production) and maintain best practices for security and configuration.

## Table of Contents

- [Overview](#overview)
- [Environment Files](#environment-files)
- [API Configuration](#api-configuration)
- [Using Environment Variables](#using-environment-variables)
- [Deployment Considerations](#deployment-considerations)
- [Best Practices](#best-practices)

## Overview

We've implemented a centralized environment variable management system that:

1. Uses `.env` files for different environments
2. Centralizes API endpoints in a single configuration file
3. Provides fallback values for local development
4. Follows security best practices

## Environment Files

The project uses the following environment files:

| File | Purpose |
|------|---------|
| `.env` | Default environment settings (development) |
| `.env.production` | Production environment settings |
| `.env.example` | Example file showing required variables (no actual values) |

### Required Variables

```
# API URLs
VITE_PRODUCT_API_URL=http://localhost:3016
VITE_ORDER_API_URL=http://localhost:3017
VITE_USER_API_URL=http://localhost:7237
VITE_IMAGE_FALLBACK_URL=http://localhost:3001/img/image-missing.jpg

# Google Auth
VITE_GOOGLE_AUTH_CLIENT_ID=<client-id-here>
```

> **IMPORTANT**: Never commit real API keys or secrets to the repository. The `.env` file is included in `.gitignore` to prevent accidental commits.

## API Configuration

All API endpoints are centralized in `src/config/apiConfig.ts`:

```typescript
// API base URLs
const API_URLS = {
  PRODUCT_API: import.meta.env.VITE_PRODUCT_API_URL || 'http://localhost:3016',
  ORDER_API: import.meta.env.VITE_ORDER_API_URL || 'http://localhost:3017',
  USER_API: import.meta.env.VITE_USER_API_URL || 'http://localhost:7237',
  IMAGE_FALLBACK: import.meta.env.VITE_IMAGE_FALLBACK_URL || 'http://localhost:3001/img/image-missing.jpg'
};

// API Endpoints
export const ENDPOINTS = {
  // Product Management
  PRODUCT: {
    BASE: `${API_URLS.PRODUCT_API}/api/ProductManagement`,
    BY_ID: (id: string) => `${API_URLS.PRODUCT_API}/api/ProductManagement/${id}`,
    FILTERED: (params: string) => `${API_URLS.PRODUCT_API}/api/productManagement/GetFilteredProducts${params}`,
    IMAGE: (path: string) => `${API_URLS.PRODUCT_API}${path}`
  },
  
  // Order Management
  ORDER: {
    BASE: `${API_URLS.ORDER_API}/api/OrderManagement`,
    SHOPPING_CART: {
      CREATE: `${API_URLS.ORDER_API}/api/OrderManagement/CreateShoppingCart`,
      GET: (retailerId: string) => `${API_URLS.ORDER_API}/api/OrderManagement/GetShoppingCart/${retailerId}`,
      DELETE_ITEM: (cartId: string) => `${API_URLS.ORDER_API}/api/OrderManagement/DeleteCartItemByID/?CartID=${cartId}`
    },
    ORDERS: {
      CREATE: `${API_URLS.ORDER_API}/api/OrderManagement/CreateOrder`,
      GET: (params: string) => `${API_URLS.ORDER_API}/api/OrderManagement/GetOrdersAndOrderDetails${params}`,
      ACCEPT_REJECT: `${API_URLS.ORDER_API}/api/OrderManagement/AcceptRejectOrder`
    }
  },
  
  // User Management
  USER: {
    REGISTER: `${API_URLS.USER_API}/api/User/registerUser`,
    VALIDATE_GOOGLE: `${API_URLS.USER_API}/api/User/validategoogleuser`
  },
  
  // Images
  IMAGES: {
    FALLBACK: API_URLS.IMAGE_FALLBACK
  }
};

export default ENDPOINTS;
```

## Using Environment Variables

### In Components

To use the API endpoints in your components:

```typescript
import ENDPOINTS from '../config/apiConfig';

// Example: Get a product by ID
const fetchProduct = async (productId) => {
  const response = await fetch(ENDPOINTS.PRODUCT.BY_ID(productId));
  return await response.json();
};

// Example: Using image URLs
<img src={ENDPOINTS.PRODUCT.IMAGE(productImageUrl)} alt="Product" />
```

### In Service/Post Files

Similarly, in your service or post files:

```typescript
import ENDPOINTS from '../config/apiConfig';

export async function getOrderDetails(orderId) {
  try {
    const response = await fetch(ENDPOINTS.ORDER.ORDERS.GET(`?id=${orderId}`));
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
}
```

### For Google Authentication

```typescript
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <YourApp />
    </GoogleOAuthProvider>
  );
}
```

## Deployment Considerations

### Local Development

For local development, the default `.env` file is used. You can create a `.env.local` file for personal overrides (not committed to Git).

### Production Deployment

For production deployment:

1. Create a `.env.production` file with production URLs
2. Build the application with `npm run build` (Vite will automatically use `.env.production`)
3. For Docker or CI/CD pipelines, you can inject environment variables at build time

### Docker Example

```dockerfile
# Build stage
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_PRODUCT_API_URL
ARG VITE_ORDER_API_URL
ARG VITE_USER_API_URL
ARG VITE_GOOGLE_AUTH_CLIENT_ID
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Best Practices

1. **Never hardcode URLs or secrets in your code**
   - Always use `ENDPOINTS` from the config file
   - Never commit `.env` files with real credentials

2. **Always provide fallbacks for local development**
   - The config file includes fallbacks for local development
   - This ensures the app can run even without all environment variables

3. **Document any new environment variables**
   - Update `.env.example` when adding new variables
   - Document their purpose and format

4. **Use environment-specific files for different settings**
   - `.env` for development
   - `.env.production` for production
   - `.env.test` for testing (if needed)

5. **Consistent naming conventions**
   - Use the prefix `VITE_` for all variables (needed for client-side access)
   - Use descriptive names: `VITE_SERVICE_NAME_PURPOSE`

By following these guidelines, we ensure our application is:
- Configurable for different environments
- Secure (no exposed secrets)
- Maintainable (centralized configuration)
- Compliant with best practices for production environments