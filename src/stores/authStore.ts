import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: '1',
    username: 'Raj Kumar',
    email: 'raj.kumar@example.com',
    createdAt: new Date().toISOString(),
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    gender: 'male',
    birthDate: '1995-06-15'
  },
  isAuthenticated: true,
  login: async (email: string, _password: string) => {
    const mockUser: User = {
      id: '1',
      username: 'Raj Kumar',
      email,
      createdAt: new Date().toISOString(),
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      gender: 'male',
      birthDate: '1995-06-15'
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  register: async (username: string, email: string, _password: string) => {
    const mockUser: User = {
      id: '1',
      username,
      email,
      createdAt: new Date().toISOString(),
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      gender: 'male',
      birthDate: '1995-06-15'
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  updateProfile: async (data: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null
    }));
  }
}));