import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: null | { email: string };
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token")
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
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    checkAuth: (state) => {
      const token = localStorage.getItem("token");
      state.isAuthenticated = !!token;
      state.token = token;
    }
  }
});

export const { setCredentials, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
