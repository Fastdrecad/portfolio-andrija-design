import { authApi } from "@/redux/services/authApi";
import { portfolioApi } from "@/redux/services/portfolioApi";
import { uploadApi } from "@/redux/services/uploadService";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import contactReducer from "./contactSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    contact: contactReducer,
    [authApi.reducerPath]: authApi.reducer,
    [portfolioApi.reducerPath]: portfolioApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, portfolioApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
