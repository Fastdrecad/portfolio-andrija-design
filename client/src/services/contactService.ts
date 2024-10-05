import { API_BASE_URL } from "@/constants";
import axios from "axios";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_BASE_URL
});

const contactService = {
  sendMessage: async (data: ContactFormData) => {
    // development
    return axiosInstance.post(`${API_BASE_URL}/api/contact`, data);

    // production
    // return axiosInstance.post(`/api/contact`, data);
  }
};

export default contactService;
