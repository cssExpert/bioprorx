export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  npi: string;
  specialty: string[];
  licenseNumber?: string;
  subscriptionTier?: SubscriptionTier;
  isVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export type SubscriptionTier = 'basic' | 'professional' | 'enterprise';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  npi: string;
  specialty: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingComplete: boolean;
}
