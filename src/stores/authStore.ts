import { create } from 'zustand';
import { storage } from '../utils/storage';
import { authService } from '../services/authService';
import type { User, AuthTokens, LoginPayload, SignupPayload } from '../types/auth';

interface AuthStore {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingComplete: boolean;
  initialize: () => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  setOnboardingComplete: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  onboardingComplete: false,

  initialize: async () => {
    try {
      const [token, user, onboarding] = await Promise.all([
        storage.getAccessToken(),
        storage.getUser<User>(),
        storage.isOnboardingComplete(),
      ]);
      set({
        isAuthenticated: !!token && !!user,
        user: user ?? null,
        onboardingComplete: onboarding,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  login: async (payload) => {
    // DEV bypass: accept any credentials while API is not live
    if (__DEV__) {
      const mockUser: User = {
        id: 'dev-001',
        email: payload.email,
        firstName: 'Sari',
        lastName: 'Chen',
        npi: '1234567890',
        specialty: ['Rheumatology'],
        isVerified: true,
        subscriptionTier: 'professional',
        createdAt: new Date().toISOString(),
      };
      const mockTokens: AuthTokens = {
        accessToken: 'dev-token',
        refreshToken: 'dev-refresh',
        expiresIn: 3600,
      };
      await Promise.all([
        storage.setTokens(mockTokens.accessToken, mockTokens.refreshToken),
        storage.setUser(mockUser),
      ]);
      set({ user: mockUser, tokens: mockTokens, isAuthenticated: true });
      return;
    }
    const { tokens, user } = await authService.login(payload);
    await Promise.all([
      storage.setTokens(tokens.accessToken, tokens.refreshToken),
      storage.setUser(user),
    ]);
    set({ user, tokens, isAuthenticated: true });
  },

  signup: async (payload) => {
    const { tokens, user } = await authService.signup(payload);
    await Promise.all([
      storage.setTokens(tokens.accessToken, tokens.refreshToken),
      storage.setUser(user),
    ]);
    set({ user, tokens, isAuthenticated: true });
  },

  logout: async () => {
    await authService.logout();
    await storage.clearAll();
    set({ user: null, tokens: null, isAuthenticated: false });
  },

  setOnboardingComplete: async () => {
    await storage.setOnboardingComplete();
    set({ onboardingComplete: true });
  },

  updateUser: (updates) => {
    const current = get().user;
    if (current) {
      const updated = { ...current, ...updates };
      storage.setUser(updated);
      set({ user: updated });
    }
  },
}));
