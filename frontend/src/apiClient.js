import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Update with your backend's URL
  withCredentials: true, // Ensure cookies are sent with requests
});

// Optional: Add a request interceptor for additional setup
apiClient.interceptors.request.use(
  (config) => {
    // Any additional configuration, like custom headers, can go here
    console.log("Request sent:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors or responses
apiClient.interceptors.response.use(
  (response) => {
    // Any logic for processing responses can go here
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Redirect to login page or take appropriate action
    }
    return Promise.reject(error);
  }
);

export default apiClient;
