export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  avatar?: string;
  gender?: 'male' | 'female' | 'other';
  birthDate?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}