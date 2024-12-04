import api from "./api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    email: string;
  };
  token: string;
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  verify: async () => {
    const response = await api.get("/auth/verify");
    return response.data;
  }
};

export default authService;
