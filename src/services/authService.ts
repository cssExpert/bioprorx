import api from './api';
import type { LoginPayload, SignupPayload, AuthTokens, User } from '../types/auth';

export const authService = {
  async login(payload: LoginPayload): Promise<{ tokens: AuthTokens; user: User }> {
    const { data } = await api.post('/auth/login', payload);
    return data;
  },

  async signup(payload: SignupPayload): Promise<{ tokens: AuthTokens; user: User }> {
    const { data } = await api.post('/auth/signup', payload);
    return data;
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  async resetPassword(code: string, password: string): Promise<void> {
    await api.post('/auth/reset-password', { code, password });
  },

  async getMe(): Promise<User> {
    const { data } = await api.get('/auth/me');
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout').catch(() => {});
  },
};
