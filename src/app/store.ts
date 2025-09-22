import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import uiSlice from '../features/ui/uiSlice';
import cartSlice from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;