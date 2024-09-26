import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "@/redux/modalSlice";
import routeReducer from "@/redux/routeSlice";

export const store = configureStore({
  reducer: {
    route: routeReducer,
    modal: modalReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
