import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  searchQuery: string;
  selectedCategory: string | null;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  currentPage: number;
  sortBy: 'title' | 'author' | 'rating' | 'date';
  sortOrder: 'asc' | 'desc';
}

const initialState: UIState = {
  searchQuery: '',
  selectedCategory: null,
  isSearchOpen: false,
  isMobileMenuOpen: false,
  currentPage: 1,
  sortBy: 'title',
  sortOrder: 'asc',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Reset to first page when filtering
    },
    setIsSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload;
    },
    setIsMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'title' | 'author' | 'rating' | 'date'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = null;
      state.currentPage = 1;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setIsSearchOpen,
  setIsMobileMenuOpen,
  setCurrentPage,
  setSortBy,
  setSortOrder,
  clearFilters,
} = uiSlice.actions;

export default uiSlice.reducer;