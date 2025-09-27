import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: 'USER' | 'ADMIN';
    avatar?: string;
  };
}

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Demo credentials fallback (works alongside existing API)
    const demoUsers: Array<{
      email: string;
      password: string;
      user: AuthResponse['user'];
      token: string;
    }> = [
      {
        email: 'user@demo.com',
        password: 'password123',
        user: {
          id: 101,
          email: 'user@demo.com',
          name: 'Demo User',
          role: 'USER',
          avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=DemoUser'
        },
        token: 'demo-token-user'
      },
      {
        email: 'admin@demo.com',
        password: 'admin123',
        user: {
          id: 1,
          email: 'admin@demo.com',
          name: 'Demo Admin',
          role: 'ADMIN',
          avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=DemoAdmin'
        },
        token: 'demo-token-admin'
      }
    ];

    const matchedDemo = demoUsers.find(
      d => d.email === credentials.email && d.password === credentials.password
    );

    // If credentials match demo accounts, short-circuit and return demo response
    if (matchedDemo) {
      return {
        token: matchedDemo.token,
        user: matchedDemo.user,
      };
    }

    // Otherwise try real API
    try {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    } catch (error) {
      // If backend is unreachable, still allow demo accounts only
      // (Non-demo credentials will propagate original error)
      throw error;
    }
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  getProfile: async () => {
    const { data } = await api.get('/auth/profile');
    return data;
  },

  refreshToken: async () => {
    const { data } = await api.post('/auth/refresh');
    return data;
  },
};