import api from './api';

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn?: string;
  description?: string;
  cover_url?: string;
  category: string;
  stock: number;
  rating?: number;
  reviews_count?: number;
  published_year?: number;
  pages?: number;
  language?: string;
  publisher?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BooksResponse {
  books: Book[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BookFilters {
  search?: string;
  category?: string;
  author?: string;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'author' | 'rating' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}

export const booksAPI = {
  getBooks: async (filters?: BookFilters): Promise<BooksResponse> => {
    const { data } = await api.get('/books', { params: filters });
    return data;
  },

  getBook: async (id: number): Promise<Book> => {
    const { data } = await api.get(`/books/${id}`);
    return data;
  },

  getCategories: async (): Promise<string[]> => {
    const { data } = await api.get('/books/categories');
    return data;
  },

  getPopularBooks: async (limit: number = 10): Promise<Book[]> => {
    const { data } = await api.get(`/books/popular?limit=${limit}`);
    return data;
  },

  getFeaturedBooks: async (limit: number = 5): Promise<Book[]> => {
    const { data } = await api.get(`/books/featured?limit=${limit}`);
    return data;
  },

  getBooksByAuthor: async (author: string, limit: number = 10): Promise<Book[]> => {
    const { data } = await api.get(`/books/author/${encodeURIComponent(author)}?limit=${limit}`);
    return data;
  },

  createBook: async (bookData: Omit<Book, 'id'> & { coverFile?: File }): Promise<Book> => {
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('category', bookData.category);
    formData.append('pages', String(bookData.pages ?? ''));
    formData.append('description', bookData.description ?? '');
    if (bookData.coverFile) {
      formData.append('cover', bookData.coverFile);
    }
    // Tambahkan field lain jika perlu
    const { data } = await api.post('/books', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  updateBook: async (id: number, bookData: Partial<Omit<Book, 'id'>> & { coverFile?: File }): Promise<Book> => {
    const formData = new FormData();
    if (bookData.title) formData.append('title', bookData.title);
    if (bookData.author) formData.append('author', bookData.author);
    if (bookData.category) formData.append('category', bookData.category);
    if (bookData.pages !== undefined) formData.append('pages', String(bookData.pages));
    if (bookData.description) formData.append('description', bookData.description);
    if (bookData.coverFile) {
      formData.append('cover', bookData.coverFile);
    }
    // Tambahkan field lain jika perlu
    const { data } = await api.put(`/books/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  deleteBook: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};