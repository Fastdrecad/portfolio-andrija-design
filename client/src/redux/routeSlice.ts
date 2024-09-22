import { createSlice } from '@reduxjs/toolkit';

const routeSlice = createSlice({
  name: 'route',
  initialState: {
    current: ''
  },
  reducers: {
    setCurrentRoute: (state, action) => {
      if (action.payload === '/') {
        state.current = '/home';
      } else if (action.payload === '/design-process') {
        state.current = '/design process';
      } else {
        state.current = action.payload;
      }
    }
  }
});

export const { setCurrentRoute } = routeSlice.actions;
export default routeSlice.reducer;
