import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'USER' | 'ADMIN';
}

export const usersAPI = {
  // Get all users (admin only)
  getUsers: async (): Promise<User[]> => {
    const { data } = await api.get('/admin/users');
    return data;
  },

  // Get user by id
  getUser: async (id: number): Promise<User> => {
    const { data } = await api.get(`/admin/users/${id}`);
    return data;
  },

  // Create user (admin only)
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const { data } = await api.post('/admin/users', userData);
    return data;
  },

  // Update user (admin only)
  updateUser: async (id: number, userData: UpdateUserRequest): Promise<User> => {
    const { data } = await api.put(`/admin/users/${id}`, userData);
    return data;
  },

  // Delete user (admin only)
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/admin/users/${id}`);
  },
};