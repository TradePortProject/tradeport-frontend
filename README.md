<!--START_SECTION:github-actions-badges-->
[![CI](https://github.com/TradePortProject/tradeport-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/TradePortProject/tradeport-frontend/actions/workflows/ci.yml)
[![Security](https://github.com/TradePortProject/tradeport-frontend/actions/workflows/ci-security-owasp.yml/badge.svg)](https://github.com/TradePortProject/tradeport-frontend/actions/workflows/ci-security-owasp.yml)
[![DAST](https://github.com/TradePortProject/tradeport-frontend/actions/workflows/ci-dast.yml/badge.svg)](https://github.com/TradePortProject/tradeport-frontend/actions/workflows/ci-dast.yml)
[![E2E Tests](https://github.com/TradePortProject/tradeport-frontend/actions/workflows/ci-selenium.yml/badge.svg)](https://github.com/TradePortProject/tradeport-frontend/actions/workflows/ci-selenium.yml)
<!--END_SECTION:github-actions-badges-->

# TradePort Frontend

The **TradePort Frontend** is a web application developed using **React**, **TypeScript**, and **Tailwind CSS**. It serves as the user interface for the TradePort platform, providing seamless and sophisticated user experiences.

## 🚀 Features

- ⚡ **Modern UI/UX** with React and Tailwind CSS
- ⚛️ **Type-Safe Development** with TypeScript
- 📈 **Scalable and Maintainable Architecture**
- 🌐 **API Integration** with C# backend services

## 🏗️ Project Structure

```
tradeport-frontend/
├── public/             # Static files
├── src/
│   ├── assets/         # Static assets (images, fonts)
│   ├── components/     # Reusable UI components
│   ├── config/         # Configuration files
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components (routes)
│   ├── posts/          # API services for data fetching
│   ├── routes/         # Route definitions and protections
│   ├── store/          # Redux store configuration
│   ├── styles/         # Global styles (Tailwind CSS)
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Entry point
│   └── vite.config.ts  # Vite configuration
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```
# API URLs - Local Development
VITE_PRODUCT_API_URL=http://localhost:3016
VITE_ORDER_API_URL=http://localhost:3017
VITE_USER_API_URL=http://localhost:7237
VITE_IMAGE_FALLBACK_URL=http://localhost:3001/img/image-missing.jpg

# Google Auth
VITE_GOOGLE_AUTH_CLIENT_ID=your-google-client-id
```

For production deployment, use `.env.production` with your production URLs:

```
# Production API URLs
VITE_PRODUCT_API_URL=https://api.tradeport.example.com/product
VITE_ORDER_API_URL=https://api.tradeport.example.com/order
VITE_USER_API_URL=https://api.tradeport.example.com/user
VITE_IMAGE_FALLBACK_URL=https://api.tradeport.example.com/img/image-missing.jpg

# Google Auth
VITE_GOOGLE_AUTH_CLIENT_ID=your-production-google-client-id
```

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/TradePortProject/tradeport-frontend.git
cd tradeport-frontend
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3001](http://localhost:3001).

## 🧪 Testing

We use **Vitest** for testing the frontend.

### Running Tests

```bash
npm run test
# or
yarn test
```

## 🛡️ Authentication (Google Authentication)

The app uses **Google Authentication** for authentication. The configuration is managed through environment variables. Make sure to set up your Google OAuth credentials and add the appropriate redirect URI in your Google Developer Console.

## 🏗️ Backend Integration

The frontend communicates with C# backend services through REST APIs. All API endpoints are centralized in `src/config/apiConfig.ts`. Update the environment variables to match your backend service URLs.

## 📦 Deployment

### Docker Deployment

You can deploy the application using Docker with the provided Dockerfile:

```bash
# Build Docker image
docker build -t tradeport-frontend .

# Run Docker container
docker run -p 8080:80 tradeport-frontend
```

### Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

Serve the build locally:

```bash
npm run preview
# or
yarn preview
```

## 🚀 Continuous Integration

The repository includes GitHub Actions workflows for automated testing and deployment. See `.github/workflows` for details.

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Open a Pull Request

Check the `docs/CONTRIBUTING.MD` file for detailed guidelines.

## 📬 Contact

For issues, reach out via the repository's [issues page](https://github.com/TradePortProject/tradeport-frontend/issues).

Happy Coding! 🚀
