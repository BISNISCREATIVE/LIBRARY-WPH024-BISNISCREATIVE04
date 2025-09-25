import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartBook {
  id: number;
  title: string;
  author: string;
  cover_url?: string;
  isbn?: string;
  addedAt: string;
  quantity: number;
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
    addToCart: (state, action: PayloadAction<Omit<CartBook, 'addedAt' | 'quantity'>>) => {
      const existingBook = state.books.find(book => book.id === action.payload.id);
      if (existingBook) {
        existingBook.quantity += 1;
      } else {
        state.books.push({
          ...action.payload,
          addedAt: new Date().toISOString(),
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const book = state.books.find(book => book.id === action.payload.id);
      if (book) {
        book.quantity = Math.max(1, action.payload.quantity);
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.books = [];
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, clearCart, setCartOpen } = cartSlice.actions;
export default cartSlice.reducer;