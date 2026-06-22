import * as SecureStore from 'expo-secure-store';

const KEYS = {
  ACCESS_TOKEN: 'bioprorx_access_token',
  REFRESH_TOKEN: 'bioprorx_refresh_token',
  USER: 'bioprorx_user',
  ONBOARDING: 'bioprorx_onboarding_complete',
} as const;

export const storage = {
  async setTokens(access: string, refresh: string) {
    await Promise.all([
      SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, access),
      SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, refresh),
    ]);
  },

  async getAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
  },

  async getRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
  },

  async clearTokens() {
    await Promise.all([
      SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),
    ]);
  },

  async setUser(user: object) {
    await SecureStore.setItemAsync(KEYS.USER, JSON.stringify(user));
  },

  async getUser<T>(): Promise<T | null> {
    const raw = await SecureStore.getItemAsync(KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  },

  async clearUser() {
    await SecureStore.deleteItemAsync(KEYS.USER);
  },

  async setOnboardingComplete() {
    await SecureStore.setItemAsync(KEYS.ONBOARDING, 'true');
  },

  async isOnboardingComplete(): Promise<boolean> {
    const val = await SecureStore.getItemAsync(KEYS.ONBOARDING);
    return val === 'true';
  },

  async clearAll() {
    await Promise.all([
      this.clearTokens(),
      this.clearUser(),
      SecureStore.deleteItemAsync(KEYS.ONBOARDING),
    ]);
  },
};
