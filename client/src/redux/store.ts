import { authApi } from "@/redux/services/authApi";
import { portfolioApi } from "@/redux/services/portfolioApi";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import routeReducer from "./routeSlice";

export const store = configureStore({
  reducer: {
    route: routeReducer,
    modal: modalReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [portfolioApi.reducerPath]: portfolioApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, portfolioApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
