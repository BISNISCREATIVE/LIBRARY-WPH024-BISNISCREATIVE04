import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartBook {
  id: number;
  title: string;
  author: string;
  cover_url?: string;
  isbn?: string;
  addedAt: string;
}

interface CartState {
  books: CartBook[];
  isOpen: boolean;
}

const initialState: CartState = {
  books: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartBook, 'addedAt'>>) => {
      const existingBook = state.books.find(book => book.id === action.payload.id);
      if (!existingBook) {
        state.books.push({
          ...action.payload,
          addedAt: new Date().toISOString(),
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    clearCart: (state) => {
      state.books = [];
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCartOpen } = cartSlice.actions;
export default cartSlice.reducer;