import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RouteState {
  currentRoute: string;
  modalOrigin: string;
  isFormSubmitted: boolean;
}

const initialState: RouteState = {
  currentRoute: "",
  modalOrigin: "",
  isFormSubmitted: false
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setCurrentRoute: (state, action: PayloadAction<string>) => {
      if (action.payload === "/") {
        state.currentRoute = "/home";
      } else if (action.payload === "/design-process") {
        state.currentRoute = "/design process";
      } else {
        state.currentRoute = action.payload;
      }
    },
    setIsFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isFormSubmitted = action.payload;
    }
  }
});

export const { setCurrentRoute, setIsFormSubmitted } = routeSlice.actions;
export default routeSlice.reducer;
