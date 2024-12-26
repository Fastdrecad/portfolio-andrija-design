import axios from "axios";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

// Base URL configuration for API using Docker Compose for development
// const API_BASE_URL = "http://localhost:3200/api";

// Base URL configuration for API
const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000/api" // Development API endpoint
  : import.meta.env.VITE_API_URL || "/api"; // Production: Nginx proxy

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Contact service for sending messages
const contactService = {
  sendMessage: async (data: ContactFormData) => {
    try {
      // POST request to /contact endpoint
      const response = await axiosInstance.post("/contact", data);
      return response.data; // Return the API response data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error sending message:",
          error.response || error.message
        );
        throw error.response?.data || error.message;
      }
      throw new Error("Unknown error occurred");
    }
  }
};

export default contactService;
