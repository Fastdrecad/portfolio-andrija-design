import { configureStore } from '@reduxjs/toolkit';
import routeReducer from './routeSlice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    route: routeReducer
  }
});

export default store;
