import axios from "axios";

// Create an Axios instance with a base URL and timeout
const mockAPI = axios.create({
  baseURL: "https://api.example.com", // Mock API base URL
  timeout: 1000,
});

// Mock user database
const mockUserDB = [
  { email: "retailer@example.com", role: "retailer" },
  { email: "wholesaler@example.com", role: "wholesaler" },
];

// Request Interceptor (Keeps other requests working)
mockAPI.interceptors.request.use((config) => {
  return config;
});

// Response Interceptor (Mocking `/auth/check-user`)
mockAPI.interceptors.response.use((response) => {
  const { config } = response;
  const { url, params } = config;

  if (url?.includes("/auth/check-user")) {
    const { email } = params || {};

    // Simulate delay before returning a mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUserDB.find((u) => u.email === email);
        if (user) {
          response.status = 200;
          response.data = user;
        } else {
          response.status = 404;
          response.data = { error: "User not registered" };
        }
        resolve(response); // Correct way to return mock data
      }, 1000);
    });
  }

  return response; // Ensures non-mocked responses are returned
});

// Error Handling Interceptor
mockAPI.interceptors.response.use(
  (response) => response, // Pass valid responses
  (error) => {
    if (error.response?.status === 404) {
      console.warn("Mock API: User not registered.");
    }
    return Promise.reject(error); // Ensures real errors are handled properly
  },
);

export { mockUserDB };
export default mockAPI;
