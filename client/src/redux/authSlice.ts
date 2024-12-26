import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: null | { email: string };
  token: string | null;
  isAuthenticated: boolean;
  expiresAt: number | null;
}

const TOKEN_EXPIRY_HOURS = 1; // Token expires after 1 hour

const getStoredAuthState = () => {
  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("expiresAt");
  const expiresAtNum = expiresAt ? parseInt(expiresAt, 10) : null;

  // Check if token is expired
  if (expiresAtNum && Date.now() >= expiresAtNum) {
    // Clear expired token
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    return {
      token: null,
      expiresAt: null,
      isAuthenticated: false
    };
  }

  return {
    token,
    expiresAt: expiresAtNum,
    isAuthenticated: !!token && !!expiresAtNum && Date.now() < expiresAtNum
  };
};

const initialState: AuthState = {
  user: null,
  ...getStoredAuthState()
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: { email: string }; token: string }>
    ) => {
      const { user, token } = action.payload;
      const expiresAt = Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000; // Current time + hours in milliseconds

      state.user = user;
      state.token = token;
      state.expiresAt = expiresAt;
      state.isAuthenticated = true;

      localStorage.setItem("token", token);
      localStorage.setItem("expiresAt", expiresAt.toString());
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiresAt = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("expiresAt");
    },
    checkAuth: (state) => {
      const { token, expiresAt, isAuthenticated } = getStoredAuthState();
      state.token = token;
      state.expiresAt = expiresAt;
      state.isAuthenticated = isAuthenticated;

      // If token is expired, clear user data
      if (!isAuthenticated) {
        state.user = null;
      }
    }
  }
});

export const { setCredentials, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
