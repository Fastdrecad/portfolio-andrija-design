import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "route",
  initialState: {
    currentRoute: "",
    modalOrigin: "",
    isFormSubmitted: false
  },
  reducers: {
    setCurrentRoute: (state, action) => {
      if (action.payload === "/") {
        state.currentRoute = "/home";
      } else if (action.payload === "/design-process") {
        state.currentRoute = "/design process";
      } else {
        state.currentRoute = action.payload;
      }
    },
    setIsFormSubmitted: (state, action) => {
      state.isFormSubmitted = action.payload;
    }
  }
});

export const { setCurrentRoute, setIsFormSubmitted } = routeSlice.actions;
export default routeSlice.reducer;
