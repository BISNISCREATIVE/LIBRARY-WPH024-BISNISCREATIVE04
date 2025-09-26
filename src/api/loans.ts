import api from './api';

export interface Loan {
  id: number;
  book_id: number;
  user_id: number;
  borrow_date: string;
  due_date: string;
  return_date?: string;
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
  book?: {
    id: number;
    title: string;
    author: string;
    cover_url?: string;
  };
}

export interface CreateLoanRequest {
  book_id: number;
  borrow_days?: number; // defaults to 14 days
}

export const loansAPI = {
  // Get user's loans
  getMyLoans: async (): Promise<Loan[]> => {
    const { data } = await api.get('/loans/my-loans');
    return data;
  },

  // Create new loan (borrow book)
  createLoan: async (loanData: CreateLoanRequest): Promise<Loan> => {
    const { data } = await api.post('/loans', loanData);
    return data;
  },

  // Return a book
  returnBook: async (loanId: number): Promise<Loan> => {
    const { data } = await api.put(`/loans/${loanId}/return`);
    return data;
  },

  // Admin: Get all loans
  getAllLoans: async (): Promise<Loan[]> => {
    const { data } = await api.get('/admin/loans');
    return data;
  },

  // Admin: Mark book as returned
  markReturned: async (loanId: number): Promise<Loan> => {
    const { data } = await api.put(`/admin/loans/${loanId}/return`);
    return data;
  },
};