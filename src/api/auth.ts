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

// Dummy users for fallback authentication
const DUMMY_USERS = [
  {
    id: 1,
    email: 'user@demo.com',
    password: 'password123',
    name: 'Demo User',
    role: 'USER' as const,
    avatar: undefined
  },
  {
    id: 2,
    email: 'admin@demo.com',
    password: 'admin123',
    name: 'Demo Admin',
    role: 'ADMIN' as const,
    avatar: undefined
  }
];

const generateDummyToken = (userId: number) => {
  return `dummy_token_${userId}_${Date.now()}`;
};

const dummyLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const user = DUMMY_USERS.find(u => u.email === credentials.email && u.password === credentials.password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const token = generateDummyToken(user.id);
  
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar
    }
  };
};

const dummyRegister = async (userData: RegisterData): Promise<AuthResponse> => {
  const newUser = {
    id: DUMMY_USERS.length + 1,
    email: userData.email,
    name: userData.name,
    role: userData.role || 'USER' as const,
    avatar: undefined
  };

  const token = generateDummyToken(newUser.id);

  return {
    token,
    user: newUser
  };
};

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    } catch (error) {
      console.warn('API login failed, using dummy authentication:', error);
      return dummyLogin(credentials);
    }
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const { data } = await api.post('/auth/register', userData);
      return data;
    } catch (error) {
      console.warn('API register failed, using dummy authentication:', error);
      return dummyRegister(userData);
    }
  },

  getProfile: async () => {
    try {
      const { data } = await api.get('/auth/profile');
      return data;
    } catch (error) {
      console.warn('API getProfile failed');
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      const { data } = await api.post('/auth/refresh');
      return data;
    } catch (error) {
      console.warn('API refreshToken failed');
      throw error;
    }
  },
};