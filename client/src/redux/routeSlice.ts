import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "route",
  initialState: {
    currentRoute: "",
    modalOrigin: ""
  },
  reducers: {
    setCurrentRoute: (state, action) => {
      state.currentRoute = action.payload.pathname || action.payload;
    }
  }
});

export const { setCurrentRoute } = routeSlice.actions;
export default routeSlice.reducer;
