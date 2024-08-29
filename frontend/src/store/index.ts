import { configureStore } from '@reduxjs/toolkit';
import traducaoReducer from './traducaoSlice';

const store = configureStore({
  reducer: {
    traducao: traducaoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
