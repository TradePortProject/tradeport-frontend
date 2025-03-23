# TradePort Frontend

The **TradePort Frontend** is a web application developed using **React**, **TypeScript**, and **Tailwind CSS**. It serves as the user interface for the TradePort platform, providing seamless and secure access to trading functionalities. Authentication is managed using **Google Authentication**, ensuring robust user identity management.

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
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components (routes)
│   ├── services/       # API services and Auth0 logic
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

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-org/tradeport-frontend.git
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
## 🛡️ Authentication (Google authentication)
The app uses **Google Authentication** for authentication. The configuration is managed through environment variables
## 🏗️ Backend Integration
The frontend communicates with C# backend services through REST APIs. Ensure the backend is running and accessible at the correct endpoints defined in the `services/` directory.
## 📦 Deployment
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
## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Open a Pull Request

## 📬 Contact
For issues, reach out via the repository's [issues page](https://github.com/your-org/tradeport-frontend/issues).

Happy Coding! 🚀

