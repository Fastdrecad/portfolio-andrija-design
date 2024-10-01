import axios from "axios";

import { API_BASE_URL } from "@/constants";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const contactService = {
  sendMessage: async (data: ContactFormData) => {
    return axios.post(`${API_BASE_URL}/api/contact`, data);
  }
};

export default contactService;
